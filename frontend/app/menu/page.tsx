"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { MenuItem, Category } from '@/lib/types';
import { storage } from '@/lib/storage';
import MenuItemCard from '@/components/MenuItemCard';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const CATEGORIES: Category[] = ['Burgers', 'Sides', 'Drinks', 'Desserts'];

export default function MenuPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadMenu = async () => {
      const menuItems = await storage.getMenu();
      setItems(menuItems);
      setLoading(false);
    };
    loadMenu();
  }, []);

  const filteredItems = items.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 pb-20">
      {/* Header */}
      <div className="bg-slate-900/50 border-b border-white/5 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Menu</h1>
          <p className="text-slate-400 max-w-2xl">
            Explore our selection of premium burgers, crispy sides, and refreshing drinks.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8">
        {/* Filters & Search */}
        <div className="bg-slate-900 border border-white/10 rounded-2xl p-4 shadow-xl mb-12 flex flex-col md:flex-row gap-4 items-center justify-between backdrop-blur-xl">
          <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 w-full md:w-auto no-scrollbar">
            <Button
              variant={activeCategory === 'All' ? 'primary' : 'ghost'}
              onClick={() => setActiveCategory('All')}
              size="sm"
              className="whitespace-nowrap"
            >
              All Items
            </Button>
            {CATEGORIES.map(cat => (
              <Button
                key={cat}
                variant={activeCategory === cat ? 'primary' : 'ghost'}
                onClick={() => setActiveCategory(cat)}
                size="sm"
                className="whitespace-nowrap"
              >
                {cat}
              </Button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="text"
              placeholder="Search menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
            />
          </div>
        </div>

        {/* Menu Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-96 bg-slate-900/50 rounded-2xl animate-pulse border border-white/5" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <MenuItemCard item={item} />
              </motion.div>
            ))}
          </div>
        )}

        {!loading && filteredItems.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="text-slate-500" size={32} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No items found</h3>
            <p className="text-slate-400">Try adjusting your search or category filter.</p>
            <Button 
              variant="outline" 
              className="mt-6"
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

