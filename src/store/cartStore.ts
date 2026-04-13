import { create } from 'zustand';
import { CartItem, Cart } from '@/types';

interface CartStore {
  cart: Cart;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  cart: { items: [], total: 0 },

  addItem: (item: CartItem) => {
    set((state) => {
      const existingItem = state.cart.items.find(i => i.productId === item.productId);
      
      let updatedItems;
      if (existingItem) {
        updatedItems = state.cart.items.map(i =>
          i.productId === item.productId
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      } else {
        updatedItems = [...state.cart.items, item];
      }

      const total = updatedItems.reduce((sum, i) => sum + (i.price * i.quantity), 0);
      return { cart: { items: updatedItems, total } };
    });
  },

  removeItem: (productId: string) => {
    set((state) => {
      const updatedItems = state.cart.items.filter(i => i.productId !== productId);
      const total = updatedItems.reduce((sum, i) => sum + (i.price * i.quantity), 0);
      return { cart: { items: updatedItems, total } };
    });
  },

  updateQuantity: (productId: string, quantity: number) => {
    set((state) => {
      const updatedItems = state.cart.items.map(i =>
        i.productId === productId ? { ...i, quantity } : i
      ).filter(i => i.quantity > 0);
      
      const total = updatedItems.reduce((sum, i) => sum + (i.price * i.quantity), 0);
      return { cart: { items: updatedItems, total } };
    });
  },

  clearCart: () => {
    set({ cart: { items: [], total: 0 } });
  },

  getTotalItems: () => {
    return get().cart.items.reduce((sum, item) => sum + item.quantity, 0);
  },

  getTotalPrice: () => {
    return get().cart.total;
  },
}));
