"use client";

import React from 'react';
import { Settings, Save } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Settings saved successfully');
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-slate-400">Manage restaurant information</p>
      </div>

      <form onSubmit={handleSave}>
        <Card className="p-6 space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="text-orange-500" />
            <h2 className="text-xl font-bold text-white">General Information</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Input label="Restaurant Name" defaultValue="BurgerHub" />
            <Input label="Phone Number" defaultValue="(555) 123-4567" />
            <Input label="Email Address" defaultValue="hello@burgerhub.com" />
            <Input label="Address" defaultValue="123 Burger Street, Foodie City" />
          </div>

          <div className="pt-4">
            <label className="block text-sm font-medium text-slate-300 mb-1.5">About Text</label>
            <textarea 
              className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
              rows={4}
              defaultValue="Crafting the ultimate burger experience with premium ingredients and passion."
            />
          </div>

          <div className="flex justify-end pt-4">
            <Button type="submit" className="gap-2">
              <Save size={18} /> Save Changes
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
}

