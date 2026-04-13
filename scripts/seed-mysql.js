const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const sampleProducts = [
  {
    name: 'Organic Vitamin C Supplement',
    description: 'High-potency vitamin C from organic ascorbic acid. Supports immune system health.',
    price: 24.99,
    category: 'Supplements',
    image: 'https://via.placeholder.com/300x200?text=Vitamin+C',
    stock: 50,
    rating: 4.5,
    benefits: '["Immune support", "Antioxidant", "Energy boost"]',
    ingredients: '["Ascorbic acid", "Rose hips", "Bioflavonoids"]'
  },
  {
    name: 'Pure Aloe Vera Skincare',
    description: 'Natural aloe vera gel for soothing and moisturizing skin.',
    price: 18.99,
    category: 'Skincare',
    image: 'https://via.placeholder.com/300x200?text=Aloe+Vera',
    stock: 75,
    rating: 4.8,
    benefits: '["Moisturizing", "Soothing", "Anti-inflammatory"]',
    ingredients: '["Aloe vera extract", "Coconut oil", "Vitamin E"]'
  },
  {
    name: 'Turmeric Wellness Capsules',
    description: 'Golden turmeric root capsules for natural wellness and joint support.',
    price: 32.99,
    category: 'Supplements',
    image: 'https://via.placeholder.com/300x200?text=Turmeric',
    stock: 40,
    rating: 4.6,
    benefits: '["Anti-inflammatory", "Joint support", "Antioxidant"]',
    ingredients: '["Turmeric root", "Black pepper", "Ginger"]'
  },
  {
    name: 'Lavender Essential Oil',
    description: 'Premium organic lavender essential oil for relaxation and wellness.',
    price: 22.99,
    category: 'Wellness',
    image: 'https://via.placeholder.com/300x200?text=Lavender+Oil',
    stock: 60,
    rating: 4.9,
    benefits: '["Relaxation", "Stress relief", "Sleep support"]',
    ingredients: '["Lavender flower oil"]'
  },
  {
    name: 'Natural Face Moisturizer',
    description: 'Lightweight moisturizer with natural ingredients for all skin types.',
    price: 28.99,
    category: 'Skincare',
    image: 'https://via.placeholder.com/300x200?text=Moisturizer',
    stock: 45,
    rating: 4.7,
    benefits: '["Hydration", "Anti-aging", "Softening"]',
    ingredients: '["Jojoba oil", "Shea butter", "Rosehip oil"]'
  },
  {
    name: 'Organic Green Tea Extract',
    description: 'Pure green tea extract for metabolism support and antioxidants.',
    price: 19.99,
    category: 'Supplements',
    image: 'https://via.placeholder.com/300x200?text=Green+Tea',
    stock: 80,
    rating: 4.4,
    benefits: '["Antioxidant", "Metabolism boost", "Energy"]',
    ingredients: '["Green tea extract", "EGCG"]'
  },
  {
    name: 'Organic Honey Face Mask',
    description: 'Nourishing honey-based face mask for radiant, glowing skin.',
    price: 25.99,
    category: 'Beauty',
    image: 'https://via.placeholder.com/300x200?text=Honey+Mask',
    stock: 55,
    rating: 4.8,
    benefits: '["Nourishing", "Brightening", "Hydrating"]',
    ingredients: '["Organic honey", "Oat extract", "Yogurt"]'
  },
  {
    name: 'Omega-3 Supplement',
    description: 'Plant-based omega-3 from algae for heart and brain health.',
    price: 35.99,
    category: 'Supplements',
    image: 'https://via.placeholder.com/300x200?text=Omega3',
    stock: 35,
    rating: 4.6,
    benefits: '["Heart health", "Brain support", "Anti-inflammatory"]',
    ingredients: '["Algae extract", "DHA", "EPA"]'
  }
];

async function seedDatabase() {
  try {
    console.log('Connecting to database...');

    // Clear existing products
    await prisma.product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    for (const product of sampleProducts) {
      await prisma.product.create({
        data: product,
      });
    }

    console.log(`Successfully inserted ${sampleProducts.length} products`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase();
