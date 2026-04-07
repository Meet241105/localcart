import express from 'express';
import Cart from '../models/Cart.js';
import { protectUser } from '../middleware/userAuth.js';

const router = express.Router();

const ensureCart = async (userId) => {
    const existing = await Cart.findOne({ user: userId });
    if (existing) return existing;
    return Cart.create({ user: userId, items: [] });
};

// @route   GET /api/cart
// @desc    Get current user's cart
// @access  Private
router.get('/', protectUser, async (req, res) => {
    try {
        const cart = await ensureCart(req.user._id);
        return res.json({ items: cart.items });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// @route   PUT /api/cart
// @desc    Replace cart items (bulk sync)
// @access  Private
router.put('/', protectUser, async (req, res) => {
    try {
        const { items } = req.body;
        if (!Array.isArray(items)) {
            return res.status(400).json({ message: 'Items must be an array' });
        }

        const cart = await ensureCart(req.user._id);
        cart.items = items;
        await cart.save();

        return res.json({ items: cart.items });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// @route   POST /api/cart/add
// @desc    Add item to cart
// @access  Private
router.post('/add', protectUser, async (req, res) => {
    try {
        const { product } = req.body;
        if (!product || !product.productId) {
            return res.status(400).json({ message: 'Product is required' });
        }

        const cart = await ensureCart(req.user._id);
        const existing = cart.items.find(
            (item) => item.productId === product.productId
        );

        if (existing) {
            existing.quantity += 1;
        } else {
            cart.items.push({
                productId: product.productId,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: product.quantity || 1,
            });
        }

        await cart.save();
        return res.json({ items: cart.items });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// @route   PATCH /api/cart/update
// @desc    Update item quantity
// @access  Private
router.patch('/update', protectUser, async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        if (!productId || typeof quantity !== 'number') {
            return res.status(400).json({ message: 'productId and quantity required' });
        }

        const cart = await ensureCart(req.user._id);
        const item = cart.items.find((i) => i.productId === productId);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        if (quantity <= 0) {
            cart.items = cart.items.filter((i) => i.productId !== productId);
        } else {
            item.quantity = quantity;
        }

        await cart.save();
        return res.json({ items: cart.items });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// @route   DELETE /api/cart/item/:productId
// @desc    Remove item from cart
// @access  Private
router.delete('/item/:productId', protectUser, async (req, res) => {
    try {
        const { productId } = req.params;
        const cart = await ensureCart(req.user._id);
        cart.items = cart.items.filter((i) => i.productId !== productId);
        await cart.save();
        return res.json({ items: cart.items });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// @route   DELETE /api/cart/clear
// @desc    Clear cart
// @access  Private
router.delete('/clear', protectUser, async (req, res) => {
    try {
        const cart = await ensureCart(req.user._id);
        cart.items = [];
        await cart.save();
        return res.json({ items: cart.items });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

export default router;
