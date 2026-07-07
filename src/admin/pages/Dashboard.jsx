'use client';

import React, { useState, useEffect } from 'react';
import API from '../../api/axios';
import { TrendingUp, Clock, Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ total: 0, new: 0, processing: 0 });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await API.get('/admin/stats');
        setStats({ 
          total: data.totalLeads, 
          new: data.newLeads, 
          processing: data.processing,
          projects: data.totalGallery,
          inventory: data.totalProducts
        });
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="h-64 flex items-center justify-center text-gray-500 font-bold uppercase tracking-widest animate-pulse">Updating Overview...</div>;

  return (
    <>
      <header className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter">System <span className="text-primary italic">Overview</span></h1>
          <p className="text-gray-500 text-xs mt-1 uppercase tracking-widest font-bold">Real-time Lead and Operations Tracking</p>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-background-alt p-8 rounded-3xl border border-white/5 animate-fade-in">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-500">
              <TrendingUp size={24} />
            </div>
            <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">+12% vs LW</span>
          </div>
          <h3 className="text-gray-400 text-xs font-black uppercase tracking-widest mb-1">Total Leads</h3>
          <span className="text-4xl font-black text-white">{stats.total}</span>
        </div>

        <div className="bg-background-alt p-8 rounded-3xl border border-white/5 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-primary/10 rounded-2xl text-primary">
              <Clock size={24} />
            </div>
            <span className="text-[10px] font-black text-primary uppercase tracking-widest">Urgent</span>
          </div>
          <h3 className="text-gray-400 text-xs font-black uppercase tracking-widest mb-1">New Requests</h3>
          <span className="text-4xl font-black text-white">{stats.new}</span>
        </div>

        <div className="bg-background-alt p-8 rounded-3xl border border-white/5 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-accent/10 rounded-2xl text-accent">
              <Globe size={24} />
            </div>
            <span className="text-[10px] font-black text-accent uppercase tracking-widest">Active</span>
          </div>
          <h3 className="text-gray-400 text-xs font-black uppercase tracking-widest mb-1">In Production</h3>
          <span className="text-4xl font-black text-white">{stats.processing}</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="bg-background-alt p-8 rounded-3xl border border-white/5">
            <h4 className="text-white font-black uppercase tracking-tighter text-lg mb-6">Quick Actions</h4>
            <div className="grid grid-cols-2 gap-4 text-center">
              <button onClick={() => router.push('/admin/leads')} className="p-4 bg-background-dark border border-white/5 rounded-2xl text-xs font-bold text-gray-400 hover:border-primary hover:text-white transition-all">MANAGE LEADS</button>
              <button onClick={() => router.push('/admin/products')} className="p-4 bg-background-dark border border-white/5 rounded-2xl text-xs font-bold text-gray-400 hover:border-primary hover:text-white transition-all">ADD PRODUCT</button>
              <button onClick={() => router.push('/admin/gallery')} className="p-4 bg-background-dark border border-white/5 rounded-2xl text-xs font-bold text-gray-400 hover:border-primary hover:text-white transition-all">UPLOAD PHOTO</button>
              <button className="p-4 bg-background-dark border border-white/5 rounded-2xl text-xs font-bold text-gray-400 hover:border-primary hover:text-white transition-all">GENERATE REPORT</button>
            </div>
         </div>
      </div>
    </>
  );
};

export default AdminDashboard;
