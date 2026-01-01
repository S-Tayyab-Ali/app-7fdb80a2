"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CreditCard, Calendar, Clock, ShieldCheck } from 'lucide-react';
import { useCart } from '@/lib/store';
import { storage } from '@/lib/storage';
import { formatPrice } from '@/lib/utils';
import { Order } from '@/lib/types';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, cartTotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    pickupTime: ''
  });

  // Redirect if cart is empty
  React.useEffect(() => {
    if (items.length === 0) {
      router.push('/cart');
    }
  }, [items, router]);

  // Generate pickup times (next 2 hours in 15 min increments)
  const generatePickupTimes = () => {
    const times = [];
    const now = new Date();
    // Start 20 mins from now
    now.setMinutes(now.getMinutes() + 20);
    // Round to next 15 min slot
    const remainder = 15 - (now.getMinutes() % 15);
    now.setMinutes(now.getMinutes() + remainder);

    for (let i = 0; i < 8; i++) {
      times.push(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      now.setMinutes(now.getMinutes() + 15);
    }
    return times;
  };

  const pickupTimes = generatePickupTimes();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.pickupTime) {
      toast.error('Please select a pickup time');
      return;
    }

    setIsProcessing(true);

    try {
      const order: Order = {
        id: Math.random().toString(36).substr(2, 9),
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        items: items,
        total: cartTotal * 1.08,
        status: 'pending',
        createdAt: new Date().toISOString(),
        pickupTime: formData.pickupTime
      };

      await storage.createOrder(order);
      clearCart();
      toast.success('Order placed successfully!');
      router.push(`/order/${order.id}`);
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
      setIsProcessing(false);
    }
  };

  const tax = cartTotal * 0.08;
  const total = cartTotal + tax;

  return (
    <div className="min-h-screen bg-slate-950 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Info */}
              <Card className="p-6">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-orange-500/20 text-orange-500 flex items-center justify-center text-sm">1</span>
                  Contact Information
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    placeholder="John Doe"
                  />
                  <Input
                    label="Phone Number"
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    placeholder="(555) 123-4567"
                  />
                  <Input
                    label="Email Address"
                    required
                    type="email"
                    className="md:col-span-2"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    placeholder="john@example.com"
                  />
                </div>
              </Card>

              {/* Pickup Time */}
              <Card className="p-6">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-orange-500/20 text-orange-500 flex items-center justify-center text-sm">2</span>
                  Pickup Time
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {pickupTimes.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setFormData({...formData, pickupTime: time})}
                      className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                        formData.pickupTime === time
                          ? 'bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-500/20'
                          : 'bg-slate-800/50 text-slate-300 border-white/10 hover:bg-slate-800'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </Card>

              {/* Payment */}
              <Card className="p-6">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-orange-500/20 text-orange-500 flex items-center justify-center text-sm">3</span>
                  Payment Details
                </h2>
                
                <div className="bg-slate-800/50 border border-white/10 rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <CreditCard className="text-orange-500" />
                    <span className="text-white font-medium">Credit or Debit Card</span>
                  </div>
                  
                  <div className="space-y-4">
                    <Input placeholder="Card number" />
                    <div className="grid grid-cols-2 gap-4">
                      <Input placeholder="MM / YY" />
                      <Input placeholder="CVC" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
                  <ShieldCheck size={16} className="text-green-500" />
                  Payments are secure and encrypted
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full"
                  isLoading={isProcessing}
                >
                  Pay {formatPrice(total)}
                </Button>
              </Card>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                {items.map((item) => (
                  <div key={item.cartId} className="flex gap-3">
                    <div className="w-12 h-12 rounded bg-slate-800 flex-shrink-0 overflow-hidden">
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between text-sm">
                        <span className="text-white font-medium">{item.quantity}x {item.name}</span>
                        <span className="text-slate-400">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                      {item.customizations && item.customizations.length > 0 && (
                        <p className="text-xs text-slate-500 mt-1 truncate">
                          {item.customizations.join(', ')}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-4 space-y-2">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Tax (8%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between text-white font-bold text-lg pt-2">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

