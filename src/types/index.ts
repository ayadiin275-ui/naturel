// Product types
export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  images: string[];
  stock: number;
  rating: number;
  reviews: Review[];
  benefits: string[];
  ingredients: string[];
  createdAt: Date;
}

export interface Review {
  _id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

// Cart types
export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

// Order types
export interface Order {
  _id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  paymentMethod: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

// User types
export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string | null;
  addresses: Address[];
  orders: string[];
  createdAt: Date;
}

// Category types
export interface Category {
  _id: string;
  name: string;
  description: string;
  image: string;
}
