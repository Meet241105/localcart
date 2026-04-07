import mongoose from 'mongoose';
import Product from '../models/Product.js';
import dotenv from 'dotenv';

dotenv.config();

const sampleProducts = [
  {
    name: "Handwoven Cotton Saree",
    description: "Elegant handwoven cotton saree from Varanasi, featuring intricate traditional patterns and vibrant colors. Perfect for special occasions.",
    price: 1299,
    originalPrice: 1999,
    category: "fashion",
    subCategory: "Sarees",
    image: "/images/saree.jpg",
    tag: "Best",
    stock: 15,
    artisan: "Rama Textiles",
    region: "Varanasi, UP",
    material: "Pure Cotton"
  },
  {
    name: "Khadi Cotton Kurta Set",
    description: "Comfortable khadi cotton kurta set, hand-spun and handwoven by local artisans. Eco-friendly and breathable.",
    price: 1379,
    originalPrice: 1899,
    category: "fashion",
    subCategory: "Kurtas",
    image: "/images/khadi.jpg",
    tag: "Eco",
    stock: 20,
    artisan: "Khadi Gramodyog",
    region: "Gujarat",
    material: "Khadi Cotton"
  },
  {
    name: "Brass Diya Set",
    description: "Traditional brass diya set of 5 pieces, handcrafted by skilled artisans. Perfect for festivals and daily puja.",
    price: 599,
    originalPrice: 899,
    category: "home-decor",
    subCategory: "Religious Items",
    image: "/images/diya.jpg",
    tag: "Featured",
    stock: 30,
    artisan: "Moradabad Crafts",
    region: "Moradabad, UP",
    material: "Brass"
  },
  {
    name: "Wooden Jewelry Box",
    description: "Beautifully carved wooden jewelry box with intricate designs. Handmade with sheesham wood.",
    price: 799,
    originalPrice: 1199,
    category: "home-decor",
    subCategory: "Storage",
    image: "/images/box.jpg",
    tag: "New",
    stock: 12,
    artisan: "Saharanpur Woodcraft",
    region: "Saharanpur, UP",
    material: "Sheesham Wood"
  },
  {
    name: "Silver Oxidized Jhumka",
    description: "Traditional oxidized silver jhumka earrings with mirror work. Lightweight and comfortable for all-day wear.",
    price: 449,
    originalPrice: 699,
    category: "jewelry",
    subCategory: "Earrings",
    image: "/images/jhumka.jpg",
    tag: "Best",
    stock: 25,
    artisan: "Rajasthan Jewels",
    region: "Jaipur, Rajasthan",
    material: "Oxidized Silver"
  },
  {
    name: "Terracotta Tea Set",
    description: "Handmade terracotta tea set with 6 cups and a kettle. Traditional design, eco-friendly.",
    price: 899,
    originalPrice: 1299,
    category: "kitchen-dining",
    subCategory: "Tea Sets",
    image: "/images/terracotta.jpg",
    tag: "Eco",
    stock: 10,
    artisan: "Pottery Village",
    region: "West Bengal",
    material: "Terracotta Clay"
  },
  {
    name: "Madhubani Wall Painting",
    description: "Authentic Madhubani wall art on canvas, featuring traditional folk art patterns and natural colors.",
    price: 1599,
    originalPrice: 2499,
    category: "regional-crafts",
    subCategory: "Paintings",
    image: "/images/madhubani.jpg",
    tag: "Featured",
    stock: 8,
    artisan: "Mithila Art",
    region: "Bihar",
    material: "Canvas, Natural Colors"
  },
  {
    name: "Sandalwood Essential Oil",
    description: "Pure sandalwood essential oil, 100% natural. Perfect for aromatherapy and skincare.",
    price: 699,
    originalPrice: 999,
    category: "personal-care",
    subCategory: "Oils",
    image: "/images/sandalwood.jpg",
    tag: "Best",
    stock: 40,
    artisan: "Mysore Aromatics",
    region: "Karnataka",
    material: "Pure Sandalwood"
  },
  {
    name: "Channapatna Wooden Toys",
    description: "Set of 5 colorful wooden toys, handcrafted using traditional lacquerware technique. Safe for children.",
    price: 599,
    originalPrice: 899,
    category: "toys",
    subCategory: "Wooden Toys",
    image: "/images/toys.jpg",
    tag: "Eco",
    stock: 18,
    artisan: "Channapatna Crafts",
    region: "Karnataka",
    material: "Ivory Wood"
  },
  {
    name: "Leather Journal Diary",
    description: "Handmade leather-bound journal with handmade paper. Perfect for writers and artists.",
    price: 799,
    originalPrice: 1199,
    category: "gifts",
    subCategory: "Stationery",
    image: "/images/journal.jpg",
    tag: "New",
    stock: 15,
    artisan: "Kolhapuri Leather",
    region: "Maharashtra",
    material: "Genuine Leather"
  },
];

const seedProducts = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing products (optional - comment out if you want to keep existing)
    // await Product.deleteMany({});
    // console.log('🗑️  Cleared existing products');

    // Insert sample products
    const products = await Product.insertMany(sampleProducts);
    console.log(`✅ Successfully added ${products.length} sample products!`);

    console.log('\n📦 Products added:');
    products.forEach((p, i) => {
      console.log(`${i + 1}. ${p.name} - ₹${p.price} (${p.category})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

seedProducts();
