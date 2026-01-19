
import { LucideIcon } from 'lucide-react';

export interface MenuItemData {
  name: string;
  icon: LucideIcon;
  badge?: string;
  specialStyle?: boolean;
}

export interface MenuGroup {
  title: string;
  items: MenuItemData[];
}

export interface BookingData {
  customerName: string;
  phoneNumber: string;
  address: string;
  weight: number;
  codAmount: number;
  note?: string;
}

export interface DashboardStats {
  totalOrders: number;
  pendingPickup: number;
  delivered: number;
  revenue: number;
  trend: {
    name: string;
    orders: number;
    revenue: number;
  }[];
}
