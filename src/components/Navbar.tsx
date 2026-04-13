'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  name: string;
  email: string;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      localStorage.removeItem('user');
      setUser(null);
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      localStorage.removeItem('user');
      setUser(null);
      router.push('/');
    }
  };

  return (
    <nav className="bg-primary text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2 font-bold text-xl">
            <span>🌿</span>
            <span>Naturel Shop</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:text-secondary transition">Home</Link>
            <Link href="/products" className="hover:text-secondary transition">Products</Link>
            <Link href="/categories" className="hover:text-secondary transition">Categories</Link>
            <Link href="/about" className="hover:text-secondary transition">About</Link>
            <Link href="/contact" className="hover:text-secondary transition">Contact</Link>
          </div>

          {/* Right side - Auth & Cart */}
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="flex items-center space-x-1 hover:text-secondary transition">
              <span>🛒</span>
              <span>Cart</span>
            </Link>
            {user ? (
              <div className="flex items-center space-x-4">
                <Link href="/profile" className="flex items-center space-x-2 hover:text-secondary transition">
                  <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-sm font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span>{user.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/login" className="bg-secondary px-4 py-2 rounded hover:bg-opacity-80 transition">
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden ml-4"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/" className="block px-4 py-2 hover:bg-secondary rounded">Home</Link>
            <Link href="/products" className="block px-4 py-2 hover:bg-secondary rounded">Products</Link>
            <Link href="/categories" className="block px-4 py-2 hover:bg-secondary rounded">Categories</Link>
            <Link href="/about" className="block px-4 py-2 hover:bg-secondary rounded">About</Link>
            <Link href="/contact" className="block px-4 py-2 hover:bg-secondary rounded">Contact</Link>
            {user ? (
              <>
                <Link href="/profile" className="block px-4 py-2 hover:bg-secondary rounded">Profile</Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 bg-red-500 hover:bg-red-600 rounded text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login" className="block px-4 py-2 hover:bg-secondary rounded">Login</Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
