"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Mail } from 'lucide-react';
import Card from '@/components/ui/Card';

export default function LocationPage() {
  return (
    <div className="min-h-screen bg-slate-950 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Find Us</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Come visit us for the freshest burgers in town. We can't wait to serve you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-8 h-full">
              <h2 className="text-2xl font-bold text-white mb-8">Contact & Hours</h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-orange-500/20 rounded-xl text-orange-500">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Address</h3>
                    <p className="text-slate-400">123 Burger Street</p>
                    <p className="text-slate-400">Foodie City, FC 90210</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-orange-500/20 rounded-xl text-orange-500">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Opening Hours</h3>
                    <div className="space-y-1 text-slate-400">
                      <p className="flex justify-between w-48"><span>Mon - Thu:</span> <span>11am - 10pm</span></p>
                      <p className="flex justify-between w-48"><span>Fri - Sat:</span> <span>11am - 11pm</span></p>
                      <p className="flex justify-between w-48"><span>Sunday:</span> <span>12pm - 9pm</span></p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-orange-500/20 rounded-xl text-orange-500">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Phone</h3>
                    <p className="text-slate-400">(555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-orange-500/20 rounded-xl text-orange-500">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Email</h3>
                    <p className="text-slate-400">hello@burgerhub.com</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-full min-h-[400px] rounded-2xl overflow-hidden border border-white/10 relative group"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422937950147!2d-73.98513032404069!3d40.7588949713861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1710356789012!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale group-hover:grayscale-0 transition-all duration-500"
            />
            <div className="absolute inset-0 pointer-events-none border-4 border-white/5 rounded-2xl" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

