'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product._id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden cursor-pointer">
        <div className="relative h-48 bg-gray-200">
          <Image
            src={product.image || 'https://via.placeholder.com/300x200'}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 line-clamp-2">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
          
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl font-bold text-primary">DT {product.price.toFixed(2)}</span>
            <div className="flex items-center">
              <span className="text-yellow-400">⭐</span>
              <span className="ml-1 text-sm">{product.rating.toFixed(1)}</span>
            </div>
          </div>

          <button className="w-full bg-primary text-white py-2 rounded hover:bg-secondary transition">
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
}
