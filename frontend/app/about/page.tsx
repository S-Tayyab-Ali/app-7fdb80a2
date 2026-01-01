"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Heart, Leaf, Award } from 'lucide-react';
import Card from '@/components/ui/Card';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero */}
      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950 z-0" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Our Story
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-400 max-w-2xl mx-auto"
          >
            Born from a passion for perfect patties and a dream to redefine the fast-casual burger experience.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-24">
        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {[
            { icon: Users, title: "Community First", desc: "We're more than a restaurant; we're a gathering place for friends and family." },
            { icon: Heart, title: "Made with Love", desc: "Every burger is crafted with care, attention to detail, and culinary passion." },
            { icon: Leaf, title: "Sustainably Sourced", desc: "We partner with local farmers to bring you the freshest, ethical ingredients." },
            { icon: Award, title: "Quality Obsessed", desc: "We never cut corners. If it's not perfect, it doesn't leave our kitchen." }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="p-6 h-full text-center hover:bg-slate-900/80 transition-colors">
                <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-500">
                  <item.icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Content Sections */}
        <div className="space-y-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">The Beginning</h2>
              <div className="space-y-4 text-slate-400 leading-relaxed">
                <p>
                  BurgerHub started in a small food truck in 2018. Our founder, Alex, was tired of dry, flavorless burgers and decided to take matters into his own hands.
                </p>
                <p>
                  Armed with a custom blend of brisket and chuck, a hot griddle, and a secret sauce recipe passed down from his grandmother, he set out to create the perfect smash burger.
                </p>
                <p>
                  Word spread quickly. Lines formed around the block. It wasn't long before we needed a permanent home to feed the hungry crowds.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative h-[400px] rounded-2xl overflow-hidden"
            >
              <img 
                src="https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Chef cooking burgers" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative h-[400px] rounded-2xl overflow-hidden md:order-2"
            >
              <img 
                src="https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Restaurant interior" 
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:order-1"
            >
              <h2 className="text-3xl font-bold text-white mb-6">Our Philosophy</h2>
              <div className="space-y-4 text-slate-400 leading-relaxed">
                <p>
                  We believe that fast food doesn't have to mean low quality. We treat every burger like a work of art.
                </p>
                <p>
                  Our buns are baked fresh daily by a local bakery. Our cheese is real cheddar, not processed plastic. Our veggies are crisp and fresh.
                </p>
                <p>
                  But most importantly, we believe in hospitality. When you walk through our doors, you're not just a customer number; you're our guest.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

