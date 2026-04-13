'use client';

import React from 'react';
import Link from 'next/link';

export default function OrderConfirmationPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="text-6xl mb-4">✓</div>
          <h1 className="text-3xl font-bold mb-4 text-primary">Order Confirmed!</h1>
          <p className="text-gray-600 text-lg mb-8">
            Thank you for your purchase! Your order has been successfully placed and is being prepared for shipment.
          </p>

          <div className="bg-gray-50 rounded p-6 mb-8 text-left">
            <h2 className="font-bold text-lg mb-4">What's Next?</h2>
            <ul className="space-y-3 text-gray-600">
              <li>✓ You will receive a confirmation email with your order details and tracking information</li>
              <li>✓ Your order will be processed and shipped within 1-2 business days</li>
              <li>✓ You can track your shipment using the tracking number provided</li>
              <li>✓ Free shipping on all orders</li>
            </ul>
          </div>

          <div className="space-y-3">
            <Link
              href="/products"
              className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-secondary transition"
            >
              Continue Shopping
            </Link>
            <br />
            <Link
              href="/"
              className="inline-block border-2 border-primary text-primary px-8 py-3 rounded-lg font-bold hover:bg-gray-50 transition"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
