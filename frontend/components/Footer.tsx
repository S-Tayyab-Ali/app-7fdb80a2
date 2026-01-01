"use client";

import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-white/5 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <span className="text-xl font-bold text-white">
                Burger<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Hub</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Crafting the ultimate burger experience with premium ingredients and passion. Order online for quick pickup.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-orange-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-orange-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-orange-400 transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/menu" className="text-slate-400 hover:text-orange-400 transition-colors text-sm">Full Menu</Link></li>
              <li><Link href="/about" className="text-slate-400 hover:text-orange-400 transition-colors text-sm">Our Story</Link></li>
              <li><Link href="/location" className="text-slate-400 hover:text-orange-400 transition-colors text-sm">Locations</Link></li>
              <li><Link href="/admin" className="text-slate-400 hover:text-orange-400 transition-colors text-sm">Admin Portal</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-slate-400 text-sm">
                <MapPin size={18} className="text-orange-500 shrink-0 mt-0.5" />
                <span>123 Burger Street,<br />Foodie City, FC 90210</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400 text-sm">
                <Phone size={18} className="text-orange-500 shrink-0" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400 text-sm">
                <Mail size={18} className="text-orange-500 shrink-0" />
                <span>hello@burgerhub.com</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-white font-semibold mb-6">Opening Hours</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between text-slate-400">
                <span>Mon - Thu</span>
                <span className="text-white">11:00 AM - 10:00 PM</span>
              </li>
              <li className="flex justify-between text-slate-400">
                <span>Fri - Sat</span>
                <span className="text-white">11:00 AM - 11:00 PM</span>
              </li>
              <li className="flex justify-between text-slate-400">
                <span>Sunday</span>
                <span className="text-white">12:00 PM - 9:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} BurgerHub. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-500 hover:text-white text-xs transition-colors">Privacy Policy</a>
            <a href="#" className="text-slate-500 hover:text-white text-xs transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

