import express from 'express';
import User from '../models/User.js';
import { generateUserToken, protectUser } from '../middleware/userAuth.js';

const router = express.Router();

// @route   POST /api/users/register
// @desc    Register user
// @access  Public
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({ name, email, password });

        return res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateUserToken(user._id),
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// @route   POST /api/users/login
// @desc    Login user
// @access  Public
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');

        if (user && (await user.comparePassword(password))) {
            if (!user.isActive) {
                return res.status(401).json({ message: 'Account is deactivated' });
            }

            return res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateUserToken(user._id),
            });
        }

        return res.status(401).json({ message: 'Invalid email or password' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', protectUser, async (req, res) => {
    try {
        return res.json({
            _id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            isActive: req.user.isActive,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

export default router;
