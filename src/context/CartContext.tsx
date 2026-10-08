import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Artwork } from '../lib/utils';

interface CartItem extends Artwork {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  addToCart: (artwork: Artwork) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  toggleCart: () => void;
  total: number;
  showNotification: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const addToCart = (artwork: Artwork) => {
    setItems(prev => {
      const existing = prev.find(item => item.id === artwork.id);
      if (existing) {
        return prev.map(item => 
          item.id === artwork.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...artwork, quantity: 1 }];
    });
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const removeFromCart = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const toggleCart = () => setIsOpen(prev => !prev);

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ items, isOpen, addToCart, removeFromCart, clearCart, toggleCart, total, showNotification }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
