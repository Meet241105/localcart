import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
    {
        productId: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
    },
    { _id: false }
);

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        userEmail: { type: String, required: true },
        shippingInfo: {
            name: { type: String, required: true },
            phone: { type: String },
            email: { type: String },
            address: { type: String, required: true },
            city: { type: String, required: true },
            postalCode: { type: String, required: true },
        },
        items: [orderItemSchema],
        subtotal: { type: Number, required: true },
        shipping: { type: Number, required: true },
        total: { type: Number, required: true },
        status: {
            type: String,
            enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
            default: 'pending',
        },
        paymentStatus: {
            type: String,
            enum: ['created', 'paid', 'failed', 'refunded'],
            default: 'created',
        },
        paymentMethod: {
            type: String,
            default: 'razorpay',
        },
        paymentDetails: {
            razorpayOrderId: { type: String },
            razorpayPaymentId: { type: String },
            razorpaySignature: { type: String },
        },
        paidAt: { type: Date },
    },
    { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
