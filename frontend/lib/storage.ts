import { MenuItem, Order, CartItem } from './types';
import { INITIAL_MENU_ITEMS } from './data';

// Keys for localStorage
const MENU_KEY = 'burgerhub_menu';
const ORDERS_KEY = 'burgerhub_orders';
const CART_KEY = 'burgerhub_cart';

// Helper to simulate delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const storage = {
  // Menu Operations
  getMenu: async (): Promise<MenuItem[]> => {
    await delay(300);
    if (typeof window === 'undefined') return INITIAL_MENU_ITEMS;
    
    const stored = localStorage.getItem(MENU_KEY);
    if (!stored) {
      localStorage.setItem(MENU_KEY, JSON.stringify(INITIAL_MENU_ITEMS));
      return INITIAL_MENU_ITEMS;
    }
    return JSON.parse(stored);
  },

  saveMenu: async (items: MenuItem[]) => {
    await delay(300);
    localStorage.setItem(MENU_KEY, JSON.stringify(items));
  },

  // Order Operations
  getOrders: async (): Promise<Order[]> => {
    await delay(300);
    if (typeof window === 'undefined') return [];
    
    const stored = localStorage.getItem(ORDERS_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  createOrder: async (order: Order) => {
    await delay(800); // Simulate processing
    const orders = await storage.getOrders();
    const newOrders = [order, ...orders];
    localStorage.setItem(ORDERS_KEY, JSON.stringify(newOrders));
    
    // Clear cart after order
    localStorage.removeItem(CART_KEY);
    return order;
  },

  updateOrderStatus: async (orderId: string, status: Order['status']) => {
    await delay(300);
    const orders = await storage.getOrders();
    const updatedOrders = orders.map(o => 
      o.id === orderId ? { ...o, status } : o
    );
    localStorage.setItem(ORDERS_KEY, JSON.stringify(updatedOrders));
  },

  // Cart Operations
  getCart: (): CartItem[] => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(CART_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  saveCart: (items: CartItem[]) => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }
};

