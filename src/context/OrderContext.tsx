import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Artwork } from '../lib/utils';

export interface OrderItem extends Artwork {
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: 'completed' | 'processing';
  paymentMethod: 'card' | 'paypal';
}

interface OrderContextType {
  orders: Order[];
  addOrder: (items: OrderItem[], total: number, paymentMethod: 'card' | 'paypal') => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('orders');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (items: OrderItem[], total: number, paymentMethod: 'card' | 'paypal') => {
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      date: new Date().toISOString(),
      items,
      total,
      status: 'completed',
      paymentMethod
    };
    setOrders(prev => [newOrder, ...prev]);
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within a OrderProvider');
  }
  return context;
}
