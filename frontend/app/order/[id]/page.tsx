"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, MapPin, ChefHat, ShoppingBag } from 'lucide-react';
import { storage } from '@/lib/storage';
import { Order } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export default function OrderConfirmationPage() {
  const params = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrder = async () => {
      if (typeof params.id === 'string') {
        const orders = await storage.getOrders();
        const foundOrder = orders.find(o => o.id === params.id);
        setOrder(foundOrder || null);
      }
      setLoading(false);
    };
    loadOrder();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl font-bold text-white mb-4">Order Not Found</h1>
        <Link href="/">
          <Button>Return Home</Button>
        </Link>
      </div>
    );
  }

  const steps = [
    { status: 'pending', label: 'Order Placed', icon: ShoppingBag },
    { status: 'preparing', label: 'Preparing', icon: ChefHat },
    { status: 'ready', label: 'Ready for Pickup', icon: CheckCircle },
    { status: 'completed', label: 'Picked Up', icon: CheckCircle },
  ];

  const currentStepIndex = steps.findIndex(s => s.status === order.status);

  return (
    <div className="min-h-screen bg-slate-950 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Order Confirmed!</h1>
          <p className="text-slate-400 text-lg">
            Thanks for your order, {order.customerName.split(' ')[0]}. We're getting started on it right away.
          </p>
        </motion.div>

        {/* Status Tracker */}
        <Card className="p-8 mb-8">
          <div className="flex justify-between relative">
            {/* Progress Bar Background */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-800 -translate-y-1/2 z-0" />
            
            {/* Active Progress Bar */}
            <div 
              className="absolute top-1/2 left-0 h-1 bg-orange-500 -translate-y-1/2 z-0 transition-all duration-500"
              style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
            />

            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index <= currentStepIndex;
              const isCurrent = index === currentStepIndex;

              return (
                <div key={step.status} className="relative z-10 flex flex-col items-center gap-3">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center border-4 transition-colors duration-300
                    ${isActive ? 'bg-orange-500 border-slate-950 text-white' : 'bg-slate-900 border-slate-800 text-slate-600'}
                    ${isCurrent ? 'ring-4 ring-orange-500/20' : ''}
                  `}>
                    <Icon size={18} />
                  </div>
                  <span className={`text-xs font-medium ${isActive ? 'text-white' : 'text-slate-600'}`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Order Details */}
          <Card className="p-6">
            <h2 className="text-xl font-bold text-white mb-6">Order Details</h2>
            <div className="space-y-4 mb-6">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between items-start">
                  <div>
                    <p className="text-white font-medium">{item.quantity}x {item.name}</p>
                    {item.customizations && (
                      <p className="text-xs text-slate-500">{item.customizations.join(', ')}</p>
                    )}
                  </div>
                  <span className="text-slate-400">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-white/10 pt-4 flex justify-between items-center">
              <span className="text-slate-400">Total Paid</span>
              <span className="text-xl font-bold text-white">{formatPrice(order.total)}</span>
            </div>
          </Card>

          {/* Pickup Info */}
          <Card className="p-6">
            <h2 className="text-xl font-bold text-white mb-6">Pickup Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-slate-800 rounded-lg text-orange-500">
                  <Clock size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-1">Pickup Time</p>
                  <p className="text-lg font-bold text-white">{order.pickupTime}</p>
                  <p className="text-xs text-slate-500">Today</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-slate-800 rounded-lg text-orange-500">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-1">Location</p>
                  <p className="text-white font-medium">BurgerHub Downtown</p>
                  <p className="text-sm text-slate-500">123 Burger Street, Foodie City</p>
                </div>
              </div>

              <div className="pt-4">
                <Badge variant="warning" className="w-full justify-center py-2">
                  Order ID: #{order.id.toUpperCase()}
                </Badge>
              </div>
            </div>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Link href="/menu">
            <Button variant="outline">Order Something Else</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

