"use client";

import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link, Outlet } from 'react-router-dom';
import { LayoutDashboard, Users, ShoppingBag, Image as ImageIcon, LogOut, Menu, X } from 'lucide-react';
import API from '../../api/axios';

const AdminLayout = () => {
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));
    if (!adminInfo || !adminInfo.token) {
      navigate('/admin/login');
      return;
    }
    // Verify the token is still valid against the server
    API.get('/admin/me')
      .then(() => setLoading(false))
      .catch(() => {
        // Token is expired or invalid — clear and redirect
        localStorage.removeItem('adminInfo');
        navigate('/admin/login');
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminInfo');
    navigate('/admin/login');
  };

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: <Users size={20} />, label: 'Leads / Quotes', path: '/admin/leads' },
    { icon: <ShoppingBag size={20} />, label: 'Products', path: '/admin/products' },
    { icon: <ImageIcon size={20} />, label: 'Gallery', path: '/admin/gallery' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background-dark flex items-center justify-center text-white font-black uppercase tracking-widest">
        Verifying Session...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background-dark font-body text-white">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-background-alt border-b border-white/5 p-4 flex justify-between items-center">
        <h2 className="text-lg font-black tracking-tighter uppercase">SMI <span className="text-primary">ADMIN</span></h2>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-background-alt border-r border-white/5 p-6 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="mb-12 hidden lg:block">
          <h2 className="text-xl font-black text-white tracking-tighter uppercase">SMI <span className="text-primary">ADMIN</span></h2>
        </div>

        <nav className="flex-1 space-y-2 mt-16 lg:mt-0">
          {menuItems.map((item, i) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={i} 
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 p-3 rounded-xl transition-all ${isActive ? 'bg-primary text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
              >
                {item.icon}
                <span className="text-xs font-bold uppercase tracking-widest">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <button onClick={handleLogout} className="flex items-center space-x-3 p-3 text-gray-500 hover:text-primary transition-colors mt-auto uppercase text-xs font-black tracking-widest">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-8 lg:p-12 overflow-y-auto mt-16 lg:mt-0">
          <Outlet />
        </main>
      </div>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;
