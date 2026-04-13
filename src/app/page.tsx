import Image from 'next/image';
import Link from 'next/link';
import { getCurrentUser } from '@/utils/auth';
import UserProfile from '@/components/UserProfile';

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <div className="w-full">
      {/* User Profile Section */}
      {user && <UserProfile user={user} />}

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Naturel Shop</h1>
              <p className="text-xl mb-6 opacity-90">
                Discover the power of nature with our premium selection of organic and natural products.
              </p>
              <div className="flex space-x-4">
                <Link
                  href="/products"
                  className="bg-white text-primary px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition"
                >
                  Shop Now
                </Link>
                <Link
                  href="/about"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-primary transition"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="text-6xl">🌿🌱🍃</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Naturel Shop?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🌍',
                title: 'Eco-Friendly',
                description: 'All products are sourced sustainably and packaged with the environment in mind.'
              },
              {
                icon: '✅',
                title: 'Quality Certified',
                description: 'Every product is certified organic and tested for purity and safety.'
              },
              {
                icon: '🚚',
                title: 'Fast Delivery',
                description: 'Free shipping on orders over $50. Delivered within 3-5 business days.'
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories Preview */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {['Supplements', 'Skincare', 'Wellness', 'Beauty'].map((category, idx) => (
              <Link key={idx} href={`/categories/${category.toLowerCase()}`}>
                <div className="bg-gradient-to-br from-primary to-secondary text-white rounded-lg p-8 text-center cursor-pointer hover:shadow-lg transition">
                  <div className="text-5xl mb-4">
                    {['💊', '🧴', '🧘', '💄'][idx]}
                  </div>
                  <h3 className="text-xl font-bold">{category}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="mb-6 text-lg opacity-90">Get exclusive offers and natural wellness tips delivered to your inbox.</p>
          <div className="flex justify-center gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-6 py-3 rounded text-black w-full md:w-64"
            />
            <button className="bg-secondary px-8 py-3 rounded font-bold hover:bg-opacity-80 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
