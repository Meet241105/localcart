import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from '../models/Admin.js';

dotenv.config();

const parseArgs = () => {
    const args = process.argv.slice(2);
    const parsed = {};

    for (let i = 0; i < args.length; i += 1) {
        const arg = args[i];
        if (!arg.startsWith('--')) continue;

        const key = arg.replace('--', '');
        const value = args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : 'true';
        parsed[key] = value;
    }

    return parsed;
};

const printUsage = () => {
    console.log('Usage: npm run seed-admin -- --name "Admin" --email "admin@example.com" --password "secret123" [--role superadmin]');
    console.log('You can also use env vars: ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_ROLE');
};

const seedAdmin = async () => {
    const args = parseArgs();

    if (args.help === 'true' || args.h === 'true') {
        printUsage();
        process.exit(0);
    }

    const name = args.name || process.env.ADMIN_NAME;
    const email = args.email || process.env.ADMIN_EMAIL;
    const password = args.password || process.env.ADMIN_PASSWORD;
    const role = args.role || process.env.ADMIN_ROLE || 'superadmin';

    if (!process.env.MONGO_URI) {
        console.error('MONGO_URI is missing in .env');
        process.exit(1);
    }

    if (!name || !email || !password) {
        console.error('Missing required admin fields: name, email, password');
        printUsage();
        process.exit(1);
    }

    if (password.length < 6) {
        console.error('Password must be at least 6 characters');
        process.exit(1);
    }

    if (!['admin', 'superadmin'].includes(role)) {
        console.error('Role must be either "admin" or "superadmin"');
        process.exit(1);
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const existing = await Admin.findOne({ email });

        if (existing) {
            existing.name = name;
            existing.password = password;
            existing.role = role;
            existing.isActive = true;
            await existing.save();

            console.log('Admin updated successfully');
            console.log(`Email: ${existing.email}`);
            console.log(`Role: ${existing.role}`);
        } else {
            const created = await Admin.create({
                name,
                email,
                password,
                role,
            });

            console.log('Admin created successfully');
            console.log(`Email: ${created.email}`);
            console.log(`Role: ${created.role}`);
        }

        process.exit(0);
    } catch (error) {
        console.error('Failed to seed admin:', error.message);
        process.exit(1);
    }
};

seedAdmin();
