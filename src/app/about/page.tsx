'use client';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">About Naturel Shop</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-600 text-lg leading-8 mb-4">
              At Naturel Shop, we believe in the power of nature to enhance health and wellness. Our mission is to provide the highest quality natural and organic products to our customers, carefully curated from trusted suppliers around the world.
            </p>
            <p className="text-gray-600 text-lg leading-8">
              We are committed to sustainability, transparency, and customer satisfaction. Every product in our store is selected for its efficacy, purity, and environmental impact.
            </p>
          </div>
          <div className="text-6xl text-center flex items-center justify-center">
            🌿
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🌍</div>
              <h3 className="text-xl font-bold mb-2">Sustainability</h3>
              <p className="text-gray-600">We prioritize eco-friendly practices and sustainable sourcing.</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">✨</div>
              <h3 className="text-xl font-bold mb-2">Quality</h3>
              <p className="text-gray-600">Only the finest natural and organic products make it to our store.</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">❤️</div>
              <h3 className="text-xl font-bold mb-2">Community</h3>
              <p className="text-gray-600">We support local communities and fair trade practices.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
