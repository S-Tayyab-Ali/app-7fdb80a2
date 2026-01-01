"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, Minus, Flame } from 'lucide-react';
import { MenuItem } from '@/lib/types';
import { useCart } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import Card from './ui/Card';
import Button from './ui/Button';
import Badge from './ui/Badge';
import Modal from './ui/Modal';

interface MenuItemCardProps {
  item: MenuItem;
}

const MenuItemCard = ({ item }: MenuItemCardProps) => {
  const { addToCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [customizations, setCustomizations] = useState<string[]>([]);

  const handleAddToCart = () => {
    addToCart(item, quantity, customizations);
    setIsModalOpen(false);
    setQuantity(1);
    setCustomizations([]);
  };

  const toggleCustomization = (option: string) => {
    if (customizations.includes(option)) {
      setCustomizations(prev => prev.filter(c => c !== option));
    } else {
      setCustomizations(prev => [...prev, option]);
    }
  };

  const customizationOptions = [
    'Extra Cheese (+$1.00)',
    'No Onions',
    'Extra Sauce',
    'Gluten Free Bun (+$2.00)',
    'Add Bacon (+$2.00)'
  ];

  return (
    <>
      <Card className="h-full flex flex-col group" hoverEffect>
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
          
          {item.popular && (
            <div className="absolute top-3 right-3">
              <Badge variant="warning" className="flex items-center gap-1 shadow-lg">
                <Flame size={12} /> Popular
              </Badge>
            </div>
          )}
          
          {!item.isAvailable && (
            <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center">
              <Badge variant="danger" className="text-lg px-4 py-2">Sold Out</Badge>
            </div>
          )}
        </div>

        <div className="p-5 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
              {item.name}
            </h3>
            <span className="text-lg font-semibold text-orange-400">
              {formatPrice(item.price)}
            </span>
          </div>
          
          <p className="text-slate-400 text-sm mb-4 flex-grow line-clamp-2">
            {item.description}
          </p>

          <Button 
            onClick={() => setIsModalOpen(true)}
            disabled={!item.isAvailable}
            className="w-full mt-auto"
            variant="secondary"
          >
            Add to Order
          </Button>
        </div>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={item.name}
      >
        <div className="space-y-6">
          <div className="relative h-56 w-full rounded-xl overflow-hidden">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 to-transparent p-4">
              <p className="text-white font-medium">{item.description}</p>
            </div>
          </div>

          {item.category === 'Burgers' && (
            <div>
              <h4 className="text-white font-medium mb-3">Customizations</h4>
              <div className="space-y-2">
                {customizationOptions.map((option) => (
                  <label key={option} className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 border border-white/5 cursor-pointer hover:bg-slate-800 transition-colors">
                    <input
                      type="checkbox"
                      checked={customizations.includes(option)}
                      onChange={() => toggleCustomization(option)}
                      className="w-5 h-5 rounded border-slate-600 text-orange-500 focus:ring-orange-500 bg-slate-700"
                    />
                    <span className="text-slate-300 text-sm">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="flex items-center gap-4 bg-slate-800 rounded-lg p-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 hover:bg-slate-700 rounded-md text-slate-300 transition-colors"
              >
                <Minus size={18} />
              </button>
              <span className="font-bold text-white w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 hover:bg-slate-700 rounded-md text-slate-300 transition-colors"
              >
                <Plus size={18} />
              </button>
            </div>

            <Button onClick={handleAddToCart} className="px-8">
              Add {formatPrice(item.price * quantity)}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MenuItemCard;

