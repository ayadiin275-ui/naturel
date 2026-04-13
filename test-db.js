const { PrismaClient } = require('@prisma/client');

async function testConnection() {
  const prisma = new PrismaClient();

  try {
    console.log('Testing database connection...');
    await prisma.$connect();
    console.log('✅ Database connected successfully!');

    // Test creating a product
    const product = await prisma.product.create({
      data: {
        name: 'Test Product',
        description: 'Test description',
        price: 10.99,
        category: 'Test',
        image: 'test.jpg',
        stock: 10,
      },
    });

    console.log('✅ Product created:', product);

    // Clean up
    await prisma.product.delete({
      where: { id: product.id },
    });

    console.log('✅ Test completed successfully!');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();