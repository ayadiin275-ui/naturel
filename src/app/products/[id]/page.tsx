'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import Image from 'next/image';

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.id}`);
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch product:', error);
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  const handleAddToCart = () => {
    if (product) {
      addItem({
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
      });
      alert('Added to cart!');
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center py-12">Product not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div>
            <div className="relative h-96 bg-gray-200 rounded-lg">
              <Image
                src={product.image || 'https://via.placeholder.com/500x400'}
                alt={product.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

            <div className="flex items-center mb-4">
              <span className="text-yellow-400 text-xl">⭐ {product.rating}</span>
              <span className="ml-2 text-gray-600">({product.reviews?.length || 0} reviews)</span>
            </div>

            <div className="mb-6">
              <p className="text-4xl font-bold text-primary">${product.price.toFixed(2)}</p>
              <p className="text-gray-600 mt-2">
                In Stock: <span className="font-bold text-green-600">{product.stock > 0 ? 'Available' : 'Out of Stock'}</span>
              </p>
            </div>

            <p className="text-gray-600 text-lg mb-6">{product.description}</p>

            {/* Benefits */}
            <div className="mb-6">
              <h3 className="font-bold text-lg mb-3">Benefits</h3>
              <ul className="space-y-2">
                {product.benefits?.map((benefit, idx) => (
                  <li key={idx} className="flex items-center">
                    <span className="text-primary mr-2">✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            {/* Ingredients */}
            <div className="mb-6">
              <h3 className="font-bold text-lg mb-3">Ingredients</h3>
              <p className="text-gray-600">
                {product.ingredients?.join(', ')}
              </p>
            </div>

            {/* Add to Cart */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-gray-300 rounded">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  −
                </button>
                <span className="px-6 py-2">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-grow bg-primary text-white py-3 rounded-lg font-bold hover:bg-secondary transition disabled:opacity-50"
              >
                Add to Cart
              </button>
            </div>

            <button className="w-full border-2 border-primary text-primary py-3 rounded-lg font-bold hover:bg-gray-50 transition">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
