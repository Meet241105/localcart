import express from 'express';
import crypto from 'crypto';
import Razorpay from 'razorpay';
import Order from '../models/Order.js';
import { protectUser } from '../middleware/userAuth.js';
import { sendPaymentReceipt } from '../services/emailService.js';
import { generatePaymentReceiptPdfBuffer } from '../services/receiptPdfService.js';

const router = express.Router();

const getRazorpayInstance = () => {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
        return null;
    }

    return new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
};

const getEstimatedDeliveryDate = (order) => {
    const baseDate = order.paidAt || order.createdAt || new Date();
    const estimate = new Date(baseDate);

    if (order.status === 'delivered') {
        return baseDate;
    }

    if (order.status === 'shipped') {
        estimate.setDate(estimate.getDate() + 2);
    } else if (order.status === 'processing') {
        estimate.setDate(estimate.getDate() + 4);
    } else if (order.status === 'cancelled') {
        return null;
    } else {
        estimate.setDate(estimate.getDate() + 5);
    }

    return estimate;
};

// @route   POST /api/orders
// @desc    Create order
// @access  Private
router.post('/', protectUser, async (req, res) => {
    try {
        const { shippingInfo, items, subtotal, shipping, total } = req.body;

        if (!shippingInfo || !items || !items.length) {
            return res.status(400).json({ message: 'Missing order data' });
        }

        const order = await Order.create({
            user: req.user._id,
            userEmail: req.user.email,
            shippingInfo,
            items,
            subtotal,
            shipping,
            total,
        });

        return res.status(201).json({
            message: 'Order created',
            orderId: order._id,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// @route   POST /api/orders/create-payment-order
// @desc    Create local order + Razorpay order
// @access  Private
router.post('/create-payment-order', protectUser, async (req, res) => {
    try {
        const { shippingInfo, items, subtotal, shipping, total } = req.body;

        if (!shippingInfo || !items || !items.length) {
            return res.status(400).json({ message: 'Missing order data' });
        }

        const razorpay = getRazorpayInstance();
        if (!razorpay) {
            return res.status(500).json({ message: 'Razorpay keys are not configured' });
        }

        const order = await Order.create({
            user: req.user._id,
            userEmail: req.user.email,
            shippingInfo,
            items,
            subtotal,
            shipping,
            total,
            paymentStatus: 'created',
            paymentMethod: 'razorpay',
        });

        const razorpayOrder = await razorpay.orders.create({
            amount: Math.round(Number(total) * 100),
            currency: 'INR',
            receipt: `order_${order._id}`,
            notes: {
                localOrderId: String(order._id),
                userId: String(req.user._id),
            },
        });

        order.paymentDetails = {
            ...order.paymentDetails,
            razorpayOrderId: razorpayOrder.id,
        };
        await order.save();

        return res.status(201).json({
            orderId: order._id,
            razorpayOrderId: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            keyId: process.env.RAZORPAY_KEY_ID,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// @route   POST /api/orders/verify-payment
// @desc    Verify Razorpay payment signature and mark order paid
// @access  Private
router.post('/verify-payment', protectUser, async (req, res) => {
    try {
        const {
            orderId,
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        } = req.body;

        if (!orderId || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({ message: 'Missing payment verification data' });
        }

        const order = await Order.findOne({ _id: orderId, user: req.user._id });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest('hex');

        if (expectedSignature !== razorpay_signature) {
            order.paymentStatus = 'failed';
            await order.save();
            return res.status(400).json({ message: 'Invalid payment signature' });
        }

        order.paymentStatus = 'paid';
        order.status = 'processing';
        order.paidAt = new Date();
        order.paymentDetails = {
            razorpayOrderId: razorpay_order_id,
            razorpayPaymentId: razorpay_payment_id,
            razorpaySignature: razorpay_signature,
        };

        await order.save();

        const receiptEmail = req.user.email || order.shippingInfo?.email;
        if (receiptEmail) {
            try {
                await sendPaymentReceipt({
                    to: receiptEmail,
                    order,
                    customerName: order.shippingInfo?.name,
                });
            } catch (emailError) {
                console.error('Receipt email failed:', emailError.message);
            }
        }

        return res.json({
            message: 'Payment verified successfully',
            orderId: order._id,
            paymentStatus: order.paymentStatus,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/orders/my-orders
// @desc    Get current logged-in user's orders
// @access  Private
router.get('/my-orders', protectUser, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });

        const transformed = orders.map((order) => ({
            ...order.toObject(),
            expectedDeliveryDate: getEstimatedDeliveryDate(order),
        }));

        return res.json({ orders: transformed });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/orders/:orderId
// @desc    Get order detail for logged-in user
// @access  Private
router.get('/:orderId', protectUser, async (req, res) => {
    try {
        const order = await Order.findOne({ _id: req.params.orderId, user: req.user._id });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        return res.json({
            ...order.toObject(),
            expectedDeliveryDate: getEstimatedDeliveryDate(order),
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/orders/:orderId/receipt
// @desc    Download payment receipt PDF for logged in user
// @access  Private
router.get('/:orderId/receipt', protectUser, async (req, res) => {
    try {
        const order = await Order.findOne({ _id: req.params.orderId, user: req.user._id });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        if (order.paymentStatus !== 'paid') {
            return res.status(400).json({ message: 'Receipt is available only for paid orders' });
        }

        const pdfBuffer = await generatePaymentReceiptPdfBuffer(order);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=receipt-${order._id}.pdf`);
        return res.send(pdfBuffer);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

export default router;
