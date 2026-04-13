'use client';

export default function Footer() {
  return (
    <footer className="bg-secondary text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
              <span>🌿</span>
              <span>Naturel Shop</span>
            </h3>
            <p className="text-sm opacity-80">
              Your trusted source for natural, organic, and eco-friendly products for a healthier lifestyle.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><a href="/" className="hover:text-white transition">Home</a></li>
              <li><a href="/products" className="hover:text-white transition">Products</a></li>
              <li><a href="/about" className="hover:text-white transition">About Us</a></li>
              <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><a href="/faq" className="hover:text-white transition">FAQ</a></li>
              <li><a href="/shipping" className="hover:text-white transition">Shipping Info</a></li>
              <li><a href="/returns" className="hover:text-white transition">Returns</a></li>
              <li><a href="/privacy" className="hover:text-white transition">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>Email: info@naturelshop.com</li>
              <li>Phone: +1 (555) 000-0000</li>
              <li>Address: 123 Natural Ave, Green City, ST 12345</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-opacity-20 mt-8 pt-8 text-center text-sm opacity-75">
          <p>&copy; 2026 Naturel Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
