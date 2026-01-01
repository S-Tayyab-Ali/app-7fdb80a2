"use client";

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center mb-6 border border-white/10">
          <ShoppingBag size={40} className="text-slate-500" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">Your cart is empty</h1>
        <p className="text-slate-400 mb-8 text-center max-w-md">
          Looks like you haven't added any delicious burgers yet. 
          Head over to our menu to get started!
        </p>
        <Link href="/menu">
          <Button size="lg">
            Browse Menu
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Your Order</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.div
                  key={item.cartId}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="bg-slate-900/50 border border-white/10 rounded-xl p-4 flex gap-4 backdrop-blur-sm"
                >
                  <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-slate-800">
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-grow flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-white text-lg">{item.name}</h3>
                        {item.customizations && item.customizations.length > 0 && (
                          <p className="text-sm text-slate-400 mt-1">
                            {item.customizations.join(', ')}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.cartId)}
                        className="text-slate-500 hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="flex justify-between items-end mt-4">
                      <div className="flex items-center gap-3 bg-slate-800 rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                          className="p-1 hover:bg-slate-700 rounded text-slate-300 transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="font-medium text-white w-6 text-center text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                          className="p-1 hover:bg-slate-700 rounded text-slate-300 transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <span className="font-bold text-orange-400">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            <div className="flex justify-end pt-4">
              <Button variant="ghost" onClick={clearCart} className="text-sm text-slate-400 hover:text-red-400">
                Clear Cart
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Tax (8%)</span>
                  <span>{formatPrice(cartTotal * 0.08)}</span>
                </div>
                <div className="border-t border-white/10 pt-3 flex justify-between text-white font-bold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(cartTotal * 1.08)}</span>
                </div>
              </div>

              <Link href="/checkout" className="block">
                <Button className="w-full group">
                  Proceed to Checkout
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <p className="text-xs text-slate-500 text-center mt-4">
                Secure checkout powered by Stripe
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

