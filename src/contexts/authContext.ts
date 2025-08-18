import { createContext } from "react";

export type AppUser = 'alex' | 'macy' | null;

export interface OrderItem {
  id: string;
  title: string;
  option: string;
  status: 'pending' | 'accepted' | 'completed';
  createdAt: number;
}

export interface AuthContextValue {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  user: AppUser;
  setUser: (user: AppUser) => void;
  logout: () => void;
  orders: OrderItem[];
  addOrder: (title: string, option: string) => void;
  acceptOrder: (orderId: string) => void;
  completeOrder: (orderId: string) => void;
}

export const AuthContext = createContext<AuthContextValue>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  user: null,
  setUser: () => {},
  logout: () => {},
  orders: [],
  addOrder: () => {},
  acceptOrder: () => {},
  completeOrder: () => {},
});