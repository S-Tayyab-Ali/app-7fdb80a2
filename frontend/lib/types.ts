export type Category = 'Burgers' | 'Sides' | 'Drinks' | 'Desserts';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  imageUrl: string;
  isAvailable: boolean;
  popular?: boolean;
  calories?: number;
}

export interface CartItem extends MenuItem {
  cartId: string;
  quantity: number;
  customizations?: string[];
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'completed';
  createdAt: string;
  pickupTime: string;
}

export interface AdminUser {
  email: string;
  name: string;
}

