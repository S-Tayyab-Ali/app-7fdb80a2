"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, ChefHat, AlertCircle, RefreshCw } from 'lucide-react';
import { storage } from '@/lib/storage';
import { Order } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('active');

  const loadOrders = async () => {
    setLoading(true);
    const data = await storage.getOrders();
    // Sort by date desc
    setOrders(data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    setLoading(false);
  };

  useEffect(() => {
    loadOrders();
    // Poll for new orders every 30 seconds
    const interval = setInterval(loadOrders, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleStatusUpdate = async (orderId: string, newStatus: Order['status']) => {
    await storage.updateOrderStatus(orderId, newStatus);
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    toast.success(`Order updated to ${newStatus}`);
  };

  const filteredOrders = orders.filter(order => {
    if (filter === 'active') return ['pending', 'preparing', 'ready'].includes(order.status);
    if (filter === 'completed') return order.status === 'completed';
    return true;
  });

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    revenue: orders.reduce((acc, o) => acc + o.total, 0)
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400">Overview of today's orders</p>
        </div>
        <Button onClick={loadOrders} variant="outline" size="sm" className="gap-2">
          <RefreshCw size={16} /> Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 flex items-center gap-4">
          <div className="p-4 bg-orange-500/20 rounded-full text-orange-500">
            <AlertCircle size={24} />
          </div>
          <div>
            <p className="text-slate-400 text-sm">Pending Orders</p>
            <p className="text-2xl font-bold text-white">{stats.pending}</p>
          </div>
        </Card>
        <Card className="p-6 flex items-center gap-4">
          <div className="p-4 bg-blue-500/20 rounded-full text-blue-500">
            <CheckCircle size={24} />
          </div>
          <div>
            <p className="text-slate-400 text-sm">Total Orders</p>
            <p className="text-2xl font-bold text-white">{stats.total}</p>
          </div>
        </Card>
        <Card className="p-6 flex items-center gap-4">
          <div className="p-4 bg-green-500/20 rounded-full text-green-500">
            <span className="text-xl font-bold">$</span>
          </div>
          <div>
            <p className="text-slate-400 text-sm">Total Revenue</p>
            <p className="text-2xl font-bold text-white">{formatPrice(stats.revenue)}</p>
          </div>
        </Card>
      </div>

      {/* Orders List */}
      <Card className="p-6">
        <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-4">
          <button
            onClick={() => setFilter('active')}
            className={`text-sm font-medium pb-4 -mb-4 border-b-2 transition-colors ${
              filter === 'active' ? 'text-orange-500 border-orange-500' : 'text-slate-400 border-transparent hover:text-white'
            }`}
          >
            Active Orders
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`text-sm font-medium pb-4 -mb-4 border-b-2 transition-colors ${
              filter === 'completed' ? 'text-orange-500 border-orange-500' : 'text-slate-400 border-transparent hover:text-white'
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`text-sm font-medium pb-4 -mb-4 border-b-2 transition-colors ${
              filter === 'all' ? 'text-orange-500 border-orange-500' : 'text-slate-400 border-transparent hover:text-white'
            }`}
          >
            All History
          </button>
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-12 text-slate-500">Loading orders...</div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-12 text-slate-500">No orders found</div>
          ) : (
            filteredOrders.map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-slate-800/50 border border-white/5 rounded-xl p-4 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center"
              >
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-bold text-white text-lg">#{order.id.toUpperCase()}</span>
                    <Badge variant={
                      order.status === 'pending' ? 'warning' :
                      order.status === 'preparing' ? 'default' :
                      order.status === 'ready' ? 'success' : 'outline'
                    }>
                      {order.status.toUpperCase()}
                    </Badge>
                    <span className="text-slate-400 text-sm flex items-center gap-1">
                      <Clock size={14} /> {order.pickupTime}
                    </span>
                  </div>
                  <p className="text-white font-medium">{order.customerName}</p>
                  <p className="text-slate-400 text-sm">
                    {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                  </p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                  {order.status === 'pending' && (
                    <Button size="sm" onClick={() => handleStatusUpdate(order.id, 'preparing')}>
                      Start Preparing
                    </Button>
                  )}
                  {order.status === 'preparing' && (
                    <Button size="sm" variant="secondary" onClick={() => handleStatusUpdate(order.id, 'ready')}>
                      Mark Ready
                    </Button>
                  )}
                  {order.status === 'ready' && (
                    <Button size="sm" variant="outline" onClick={() => handleStatusUpdate(order.id, 'completed')}>
                      Complete Order
                    </Button>
                  )}
                  <div className="text-right min-w-[80px]">
                    <p className="font-bold text-white">{formatPrice(order.total)}</p>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}

