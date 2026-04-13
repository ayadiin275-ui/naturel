const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/naturel-shop';

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  image: String,
  images: [String],
  stock: Number,
  rating: { type: Number, default: 0 },
  reviews: [{
    userId: String,
    userName: String,
    rating: Number,
    comment: String,
    createdAt: { type: Date, default: Date.now }
  }],
  benefits: [String],
  ingredients: [String],
  createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);

const sampleProducts = [
  {
    name: 'Organic Vitamin C Supplement',
    description: 'High-potency vitamin C from organic ascorbic acid. Supports immune system health.',
    price: 24.99,
    category: 'Supplements',
    image: 'https://images.unsplash.com/photo-1550572017-edd951aa8ca9?w=300&h=200&fit=crop',
    stock: 50,
    rating: 4.5,
    benefits: ['Immune support', 'Antioxidant', 'Energy boost'],
    ingredients: ['Ascorbic acid', 'Rose hips', 'Bioflavonoids']
  },
  {
    name: 'Pure Aloe Vera Skincare',
    description: 'Natural aloe vera gel for soothing and moisturizing skin.',
    price: 18.99,
    category: 'Skincare',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=200&fit=crop',
    stock: 75,
    rating: 4.8,
    benefits: ['Moisturizing', 'Soothing', 'Anti-inflammatory'],
    ingredients: ['Aloe vera extract', 'Coconut oil', 'Vitamin E']
  },
  {
    name: 'Turmeric Wellness Capsules',
    description: 'Golden turmeric root capsules for natural wellness and joint support.',
    price: 32.99,
    category: 'Supplements',
    image: 'https://images.unsplash.com/photo-1618375569909-3c8616cf09ae?w=300&h=200&fit=crop',
    stock: 40,
    rating: 4.6,
    benefits: ['Anti-inflammatory', 'Joint support', 'Antioxidant'],
    ingredients: ['Turmeric root', 'Black pepper', 'Ginger']
  },
  {
    name: 'Lavender Essential Oil',
    description: 'Premium organic lavender essential oil for relaxation and wellness.',
    price: 22.99,
    category: 'Wellness',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=300&h=200&fit=crop',
    stock: 60,
    rating: 4.9,
    benefits: ['Relaxation', 'Stress relief', 'Sleep support'],
    ingredients: ['Lavender flower oil']
  },
  {
    name: 'Natural Face Moisturizer',
    description: 'Lightweight moisturizer with natural ingredients for all skin types.',
    price: 28.99,
    category: 'Skincare',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=200&fit=crop',
    stock: 45,
    rating: 4.7,
    benefits: ['Hydration', 'Anti-aging', 'Softening'],
    ingredients: ['Jojoba oil', 'Shea butter', 'Rosehip oil']
  },
  {
    name: 'Organic Green Tea Extract',
    description: 'Pure green tea extract for metabolism support and antioxidants.',
    price: 19.99,
    category: 'Supplements',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=300&h=200&fit=crop',
    stock: 80,
    rating: 4.4,
    benefits: ['Antioxidant', 'Metabolism boost', 'Energy'],
    ingredients: ['Green tea extract', 'EGCG']
  },
  {
    name: 'Organic Honey Face Mask',
    description: 'Nourishing honey-based face mask for radiant, glowing skin.',
    price: 25.99,
    category: 'Beauty',
    image: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=300&h=200&fit=crop',
    stock: 55,
    rating: 4.8,
    benefits: ['Nourishing', 'Brightening', 'Hydrating'],
    ingredients: ['Organic honey', 'Oat extract', 'Yogurt']
  },
  {
    name: 'Omega-3 Supplement',
    description: 'Plant-based omega-3 from algae for heart and brain health.',
    price: 35.99,
    category: 'Supplements',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop',
    stock: 35,
    rating: 4.6,
    benefits: ['Heart health', 'Brain support', 'Anti-inflammatory'],
    ingredients: ['Algae extract', 'DHA', 'EPA']
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    const result = await Product.insertMany(sampleProducts);
    console.log(`Successfully inserted ${result.length} products`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
