"use client";

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, UtensilsCrossed, LogOut, Settings } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { cn } from '@/lib/utils';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Simple check - in a real app this would be more robust
    const auth = localStorage.getItem('burgerhub_auth');
    if (!auth) {
      router.push('/login');
    }
  }, [router]);

  if (!isAuthenticated) return null;

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Menu Management', href: '/admin/menu', icon: UtensilsCrossed },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 border-r border-white/5 p-6 flex flex-col">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white">Admin Portal</h2>
          <p className="text-sm text-slate-500">Manage your restaurant</p>
        </div>

        <nav className="space-y-2 flex-grow">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link key={item.href} href={item.href}>
                <div className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors",
                  isActive 
                    ? "bg-orange-500/10 text-orange-500 border border-orange-500/20" 
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                )}>
                  <Icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-500 transition-colors mt-auto"
        >
          <LogOut size={20} />
          <span className="font-medium">Sign Out</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 md:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

