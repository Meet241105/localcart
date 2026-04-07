import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide product name'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide product description'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide product price'],
      min: 0,
    },
    originalPrice: {
      type: Number,
      min: 0,
    },
    category: {
      type: String,
      required: [true, 'Please provide product category'],
      enum: [
        'home-decor',
        'fashion',
        'jewelry',
        'gifts',
        'kitchen-dining',
        'toys',
        'personal-care',
        'regional-crafts',
      ],
    },
    subCategory: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Please provide product image'],
    },
    images: [{
      type: String,
    }],
    tag: {
      type: String,
      enum: ['Best', 'New', 'Eco', 'Sale', 'Hot', 'Featured', ''],
      default: '',
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    artisan: {
      type: String,
      trim: true,
    },
    region: {
      type: String,
      trim: true,
    },
    material: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for search
productSchema.index({ name: 'text', description: 'text' });

const Product = mongoose.model('Product', productSchema);

export default Product;
