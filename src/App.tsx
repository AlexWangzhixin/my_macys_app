import { Routes, Route, Navigate } from "react-router-dom";
import Home from "@/pages/Home";
import TestPage from "@/pages/TestPage";
import { useMemo, useState } from "react";
import { AuthContext, type AppUser, type OrderItem } from '@/contexts/authContext';
import Login from '@/pages/Login';
import AlexCenter from '@/pages/AlexCenter';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AppUser>(null);
  const [orders, setOrders] = useState<OrderItem[]>([]);

  const addOrder = (title: string, option: string) => {
    const newOrder: OrderItem = {
      id: Math.random().toString(36).slice(2),
      title,
      option,
      status: 'pending',
      createdAt: Date.now(),
    };
    setOrders((prev) => [newOrder, ...prev]);
  };

  const acceptOrder = (orderId: string) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: 'accepted' } : o)));
  };

  const completeOrder = (orderId: string) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: 'completed' } : o)));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      setIsAuthenticated,
      user,
      setUser,
      logout,
      orders,
      addOrder,
      acceptOrder,
      completeOrder,
    }),
    [isAuthenticated, user, orders]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/alex" element={<ProtectedRoute><AlexCenter /></ProtectedRoute>} />
        <Route path="/other" element={<div className="text-center text-xl">Other Page - Coming Soon</div>} />
        <Route path="/test" element={<TestPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthContext.Provider>
  );
}
