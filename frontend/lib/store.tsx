"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, MenuItem, Order } from './types';
import { storage } from './storage';
import toast from 'react-hot-toast';

interface CartContextType {
  items: CartItem[];
  addToCart: (item: MenuItem, quantity: number, customizations?: string[]) => void;
  removeFromCart: (cartId: string) => void;
  updateQuantity: (cartId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from storage on mount
  useEffect(() => {
    const loadCart = () => {
      const storedItems = storage.getCart();
      setItems(storedItems);
      setIsLoaded(true);
    };
    loadCart();
  }, []);

  // Save cart to storage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      storage.saveCart(items);
    }
  }, [items, isLoaded]);

  const addToCart = (item: MenuItem, quantity: number, customizations: string[] = []) => {
    const newItem: CartItem = {
      ...item,
      cartId: Math.random().toString(36).substr(2, 9),
      quantity,
      customizations
    };
    
    setItems(prev => [...prev, newItem]);
    toast.success(`Added ${item.name} to cart`);
  };

  const removeFromCart = (cartId: string) => {
    setItems(prev => prev.filter(item => item.cartId !== cartId));
    toast.success('Item removed from cart');
  };

  const updateQuantity = (cartId: string, quantity: number) => {
    if (quantity < 1) return;
    setItems(prev => prev.map(item => 
      item.cartId === cartId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => {
    setItems([]);
    storage.saveCart([]);
  };

  const cartTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      items, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      cartTotal,
      itemCount 
    }}>
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

