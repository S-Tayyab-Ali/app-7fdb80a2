"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Star, ShieldCheck } from 'lucide-react';
import Button from '@/components/ui/Button';
import MenuItemCard from '@/components/MenuItemCard';
import { INITIAL_MENU_ITEMS } from '@/lib/data';

export default function Home() {
  const featuredItems = INITIAL_MENU_ITEMS.filter(item => item.popular).slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-slate-950" />
          <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-orange-600/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-red-600/10 rounded-full blur-[120px] animate-pulse delay-1000" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        </div>

        <div className="container mx-auto px-4 z-10 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 mb-6">
              <Star size={16} className="fill-orange-400" />
              <span className="text-sm font-medium">Voted Best Burger 2024</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
              Taste the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-orange-600 animate-gradient">
                Extraordinary
              </span>
            </h1>
            <p className="text-lg text-slate-400 mb-8 max-w-lg leading-relaxed">
              Premium smashed patties, artisanal buns, and house-made sauces. 
              Experience the burger revolution right here at BurgerHub.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/menu">
                <Button size="lg" className="group">
                  Order Now
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="secondary" size="lg">
                  Our Story
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 w-full aspect-square max-w-[600px] mx-auto">
              <img 
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Delicious Burger"
                className="w-full h-full object-cover rounded-full shadow-2xl shadow-orange-500/20 border-4 border-white/5"
              />
              
              {/* Floating Badges */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-slate-900/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/20 rounded-lg text-green-400">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Pickup In</p>
                    <p className="text-white font-bold">15 Mins</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -left-4 bg-slate-900/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-500/20 rounded-lg text-orange-400">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Quality</p>
                    <p className="text-white font-bold">100% Angus</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-24 bg-slate-900 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Fan Favorites</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Tried, tested, and loved by thousands. These are the burgers that put us on the map.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <MenuItemCard item={item} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/menu">
              <Button variant="outline" size="lg">
                View Full Menu
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-slate-950 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Fresh Ingredients",
                desc: "We source our produce locally and grind our beef daily for maximum freshness.",
                icon: "🥬"
              },
              {
                title: "Fast Pickup",
                desc: "Order online and skip the line. Your food will be hot and ready when you arrive.",
                icon: "⚡"
              },
              {
                title: "Eco-Friendly",
                desc: "Our packaging is 100% compostable because we care about the planet as much as burgers.",
                icon: "🌱"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-slate-900/50 border border-white/5 p-8 rounded-2xl hover:bg-slate-900 transition-colors"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600 to-red-700 opacity-20" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Hungry Yet?</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Your perfect burger is just a few clicks away. Order now for pickup and taste the magic.
          </p>
          <Link href="/menu">
            <Button size="lg" className="text-lg px-10 py-6 shadow-2xl shadow-orange-500/30">
              Start Your Order
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

