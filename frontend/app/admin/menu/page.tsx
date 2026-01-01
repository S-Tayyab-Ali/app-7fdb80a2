"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Image as ImageIcon } from 'lucide-react';
import { storage } from '@/lib/storage';
import { MenuItem, Category } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import Badge from '@/components/ui/Badge';
import toast from 'react-hot-toast';

const CATEGORIES: Category[] = ['Burgers', 'Sides', 'Drinks', 'Desserts'];

export default function MenuManagement() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  
  // Form State
  const [formData, setFormData] = useState<Partial<MenuItem>>({
    name: '',
    description: '',
    price: 0,
    category: 'Burgers',
    imageUrl: '',
    isAvailable: true,
    popular: false
  });

  const loadMenu = async () => {
    const menuItems = await storage.getMenu();
    setItems(menuItems);
  };

  useEffect(() => {
    loadMenu();
  }, []);

  const handleOpenModal = (item?: MenuItem) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({
        name: '',
        description: '',
        price: 0,
        category: 'Burgers',
        imageUrl: '',
        isAvailable: true,
        popular: false
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      let newItems = [...items];
      
      if (editingItem) {
        // Update existing
        newItems = newItems.map(item => 
          item.id === editingItem.id ? { ...item, ...formData } as MenuItem : item
        );
        toast.success('Item updated successfully');
      } else {
        // Create new
        const newItem: MenuItem = {
          ...formData as MenuItem,
          id: Math.random().toString(36).substr(2, 9),
        };
        newItems.push(newItem);
        toast.success('Item created successfully');
      }

      await storage.saveMenu(newItems);
      setItems(newItems);
      setIsModalOpen(false);
    } catch (error) {
      toast.error('Failed to save item');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      const newItems = items.filter(item => item.id !== id);
      await storage.saveMenu(newItems);
      setItems(newItems);
      toast.success('Item deleted');
    }
  };

  const handleToggleAvailability = async (item: MenuItem) => {
    const newItems = items.map(i => 
      i.id === item.id ? { ...i, isAvailable: !i.isAvailable } : i
    );
    await storage.saveMenu(newItems);
    setItems(newItems);
    toast.success(`Item marked as ${!item.isAvailable ? 'Available' : 'Unavailable'}`);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Menu Management</h1>
          <p className="text-slate-400">Add, edit, or remove menu items</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="gap-2">
          <Plus size={20} /> Add New Item
        </Button>
      </div>

      <div className="grid gap-6">
        {items.map((item) => (
          <Card key={item.id} className="p-4 flex flex-col md:flex-row gap-4 items-center">
            <div className="w-24 h-24 rounded-lg bg-slate-800 overflow-hidden flex-shrink-0">
              <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
            </div>
            
            <div className="flex-grow text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                <h3 className="font-bold text-white text-lg">{item.name}</h3>
                <Badge variant={item.isAvailable ? 'success' : 'danger'}>
                  {item.isAvailable ? 'Available' : 'Sold Out'}
                </Badge>
                {item.popular && <Badge variant="warning">Popular</Badge>}
              </div>
              <p className="text-slate-400 text-sm mb-1">{item.description}</p>
              <p className="text-orange-400 font-bold">{formatPrice(item.price)}</p>
            </div>

            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="secondary" 
                onClick={() => handleToggleAvailability(item)}
              >
                {item.isAvailable ? 'Mark Sold Out' : 'Mark Available'}
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => handleOpenModal(item)}
              >
                <Edit2 size={16} />
              </Button>
              <Button 
                size="sm" 
                variant="danger" 
                onClick={() => handleDelete(item.id)}
              >
                <Trash2 size={16} />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? 'Edit Item' : 'Add New Item'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Item Name"
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
            required
          />
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Description</label>
            <textarea
              className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
              rows={3}
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})}
              required
            />
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Category</label>
              <select
                className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value as Category})}
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <Input
            label="Image URL"
            value={formData.imageUrl}
            onChange={e => setFormData({...formData, imageUrl: e.target.value})}
            placeholder="https://..."
            required
          />

          <div className="flex items-center gap-4 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.popular}
                onChange={e => setFormData({...formData, popular: e.target.checked})}
                className="w-5 h-5 rounded border-slate-600 text-orange-500 focus:ring-orange-500 bg-slate-700"
              />
              <span className="text-slate-300">Mark as Popular</span>
            </label>
            
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isAvailable}
                onChange={e => setFormData({...formData, isAvailable: e.target.checked})}
                className="w-5 h-5 rounded border-slate-600 text-orange-500 focus:ring-orange-500 bg-slate-700"
              />
              <span className="text-slate-300">Available</span>
            </label>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {editingItem ? 'Save Changes' : 'Create Item'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

