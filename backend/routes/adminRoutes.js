import express from 'express';
import Admin from '../models/Admin.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import User from '../models/User.js';
import { generateToken, protect, superAdminOnly } from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/admin/register
// @desc    Register new admin (superadmin only)
// @access  Private/Superadmin
router.post('/register', protect, superAdminOnly, async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if admin exists
    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Create admin
    const admin = await Admin.create({
      name,
      email,
      password,
      role: role || 'admin',
    });

    if (admin) {
      res.status(201).json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        message: 'Admin created successfully',
      });
    } else {
      res.status(400).json({ message: 'Invalid admin data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/admin/login
// @desc    Authenticate admin & get token
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for admin
    const admin = await Admin.findOne({ email }).select('+password');

    if (admin && (await admin.comparePassword(password))) {
      if (!admin.isActive) {
        return res.status(401).json({ message: 'Account is deactivated' });
      }

      res.json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        token: generateToken(admin._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/admin/profile
// @desc    Get admin profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id);

    if (admin) {
      res.json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        isActive: admin.isActive,
      });
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/admin/all
// @desc    Get all admins (superadmin only)
// @access  Private/Superadmin
router.get('/all', protect, superAdminOnly, async (req, res) => {
  try {
    const admins = await Admin.find({});
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/admin/analytics
// @desc    Get admin dashboard analytics
// @access  Private/Admin
router.get('/analytics', protect, async (req, res) => {
  try {
    const now = new Date();
    const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfPreviousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const startOfSixMonthWindow = new Date(now.getFullYear(), now.getMonth() - 5, 1);
    const monthFormatter = new Intl.DateTimeFormat('en-IN', { month: 'short' });

    const [
      totalProducts,
      activeProducts,
      totalUsers,
      totalOrders,
      paidOrders,
      currentMonthOrders,
      previousMonthOrders,
      products,
      latestProducts,
      latestOrders,
      monthlyTrendRaw,
      categoryBreakdownRaw,
      topSellingRaw,
    ] = await Promise.all([
      Product.countDocuments({}),
      Product.countDocuments({ isActive: true }),
      User.countDocuments({}),
      Order.countDocuments({}),
      Order.find({ paymentStatus: 'paid' }).select('total createdAt'),
      Order.countDocuments({ createdAt: { $gte: startOfCurrentMonth } }),
      Order.countDocuments({
        createdAt: {
          $gte: startOfPreviousMonth,
          $lt: startOfCurrentMonth,
        },
      }),
      Product.find({ isActive: true }).select('price stock category'),
      Product.find({}).sort({ createdAt: -1 }).limit(5).select('name createdAt'),
      Order.find({}).sort({ createdAt: -1 }).limit(5).select('total paymentStatus createdAt'),
      Order.aggregate([
        {
          $match: {
            createdAt: { $gte: startOfSixMonthWindow },
          },
        },
        {
          $group: {
            _id: {
              year: { $year: '$createdAt' },
              month: { $month: '$createdAt' },
            },
            orders: { $sum: 1 },
            revenue: {
              $sum: {
                $cond: [{ $eq: ['$paymentStatus', 'paid'] }, '$total', 0],
              },
            },
          },
        },
      ]),
      Product.aggregate([
        { $match: { isActive: true } },
        {
          $group: {
            _id: '$category',
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
      ]),
      Order.aggregate([
        { $unwind: '$items' },
        {
          $group: {
            _id: '$items.name',
            quantitySold: { $sum: '$items.quantity' },
            revenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } },
          },
        },
        { $sort: { quantitySold: -1 } },
        { $limit: 5 },
      ]),
    ]);

    const inventoryValue = products.reduce(
      (sum, product) => sum + (Number(product.price) || 0) * (Number(product.stock) || 0),
      0
    );

    const revenue = paidOrders.reduce((sum, order) => sum + (Number(order.total) || 0), 0);
    const categories = new Set(products.map((p) => p.category).filter(Boolean));

    const growthPercent =
      previousMonthOrders > 0
        ? ((currentMonthOrders - previousMonthOrders) / previousMonthOrders) * 100
        : currentMonthOrders > 0
          ? 100
          : 0;

    const productActivity = latestProducts.map((product) => ({
      type: 'product',
      message: `Product added: ${product.name}`,
      createdAt: product.createdAt,
    }));

    const orderActivity = latestOrders.map((order) => ({
      type: 'order',
      message: `Order ${order.paymentStatus}: Rs ${Number(order.total || 0).toLocaleString()}`,
      createdAt: order.createdAt,
    }));

    const activity = [...productActivity, ...orderActivity]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 6);

    const monthlyTrendMap = new Map(
      monthlyTrendRaw.map((row) => {
        const key = `${row._id.year}-${row._id.month}`;
        return [key, row];
      })
    );

    const monthlyTrend = Array.from({ length: 6 }, (_, index) => {
      const pointDate = new Date(now.getFullYear(), now.getMonth() - (5 - index), 1);
      const key = `${pointDate.getFullYear()}-${pointDate.getMonth() + 1}`;
      const matched = monthlyTrendMap.get(key);
      return {
        month: monthFormatter.format(pointDate),
        orders: matched?.orders || 0,
        revenue: Number(matched?.revenue || 0),
      };
    });

    const categoryBreakdown = categoryBreakdownRaw.map((row) => ({
      category: row._id,
      count: row.count,
    }));

    const topSellingProducts = topSellingRaw.map((row) => ({
      name: row._id,
      quantitySold: row.quantitySold,
      revenue: Number(row.revenue || 0),
    }));

    res.json({
      totals: {
        products: totalProducts,
        activeProducts,
        users: totalUsers,
        orders: totalOrders,
        categories: categories.size,
      },
      finance: {
        inventoryValue,
        revenue,
      },
      growth: {
        currentMonthOrders,
        previousMonthOrders,
        percent: Number(growthPercent.toFixed(1)),
      },
      charts: {
        monthlyTrend,
        categoryBreakdown,
        topSellingProducts,
      },
      activity,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/admin/:id
// @desc    Delete admin (superadmin only)
// @access  Private/Superadmin
router.delete('/:id', protect, superAdminOnly, async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);

    if (admin) {
      await admin.deleteOne();
      res.json({ message: 'Admin removed' });
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
