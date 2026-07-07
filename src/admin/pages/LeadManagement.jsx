"use client";

import React, { useState, useEffect } from 'react';
import API from '../../api/axios';
import { Download, Filter, Search, MoreVertical, Trash2, Trash, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LeadManagement = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [openMenuId, setOpenMenuId] = useState(null);

  useEffect(() => {
    fetchLeads();
    const handleClickOutside = () => setOpenMenuId(null);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const fetchLeads = async () => {
    try {
      console.log('📡 [ADMIN_FETCH] Requesting GET /api/leads...');
      const { data } = await API.get('/leads');
      console.log(`✅ [ADMIN_FETCH] SUCCESS: Received ${data.length} leads:`, data.map(l => ({ id: l._id, name: l.name, file: l.uploadedFile })));
      setLeads(data);
    } catch (err) {
      console.error('❌ [ADMIN_FETCH] FAILED:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      alert('Failed to fetch leads from server.');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/leads/${id}`, { status });
      fetchLeads();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('PERMANENTLY DELETE THIS LEAD?')) {
      try {
        await API.delete(`/leads/${id}`);
        fetchLeads();
        setOpenMenuId(null);
      } catch (err) {
        alert('Failed to delete lead');
      }
    }
  };

  const handleDeleteCompleted = async () => {
    const completedLeads = leads.filter(l => l.status === 'completed');
    if (completedLeads.length === 0) return alert('No completed leads.');
    if (window.confirm(`DELETE ALL ${completedLeads.length} COMPLETED LEADS?`)) {
      try {
        for (const lead of completedLeads) await API.delete(`/leads/${lead._id}`);
        fetchLeads();
      } catch (err) {
        alert('Error deleting leads');
      }
    }
  };

  const filteredLeads = leads.filter(lead => 
    lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportCSV = () => {
    const headers = ['Name,Company,Country,WhatsApp,Email,Product,Quantity,Status,Date\\n'];
    const rows = leads.map(l => `${l.name},${l.company},${l.country},${l.whatsapp},${l.email},${l.productType},${l.quantity},${l.status},${new Date(l.createdAt).toLocaleDateString()}`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'smi_leads.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (loading) return <div className="h-64 flex items-center justify-center text-gray-500 font-bold uppercase animate-pulse">Scanning...</div>;

  return (
    <div className="animate-fade-in text-white/90">
      <header className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Lead <span className="text-primary italic">Database</span></h1>
          <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">Manage requests and status</p>
        </div>
        <div className="flex items-center space-x-3">
          <button onClick={handleDeleteCompleted} className="flex items-center space-x-2 px-6 py-3 bg-white/5 border border-white/10 text-gray-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500/10 hover:text-red-500 transition-all">
            <Trash size={14} /> <span>Clear Completed</span>
          </button>
          <button onClick={exportCSV} className="flex items-center space-x-2 px-6 py-3 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-200 transition-all">
            <Download size={14} /> <span>Export CSV</span>
          </button>
        </div>
      </header>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input type="text" placeholder="Search..." className="w-full bg-background-alt border border-white/5 rounded-xl py-5 pl-12 pr-4 focus:outline-none focus:border-primary text-sm font-bold" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
      </div>

      <div className="bg-background-alt rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-[10px] font-black text-gray-500 uppercase tracking-widest bg-white/[0.02]">
                <th className="px-8 py-7">Customer</th>
                <th className="px-8 py-7">Product</th>
                <th className="px-8 py-7">Concept</th>
                <th className="px-8 py-7">Contact</th>
                <th className="px-8 py-7">Status</th>
                <th className="px-8 py-7 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredLeads.map(lead => (
                <tr key={lead._id} className="group hover:bg-white/[0.03] transition-colors relative">
                  <td className="px-8 py-7">
                    <div className="font-black text-sm text-white group-hover:text-primary transition-colors">{lead.name}</div>
                    <div className="text-[9px] text-gray-500 uppercase font-black">{lead.company || "Individual"}</div>
                  </td>
                  <td className="px-8 py-7">
                    <div className="font-bold text-xs uppercase">{lead.productType}</div>
                    <div className="text-[10px] text-primary font-black uppercase tracking-tighter mt-1 bg-primary/5 px-2 py-0.5 rounded inline-block">Qty: {lead.quantity} units</div>
                  </td>
                  <td className="px-8 py-7">
                    {lead.uploadedFile ? (
                      <div className="flex flex-col space-y-2">
                        {/* Image Preview if it's an image */}
                        {lead.uploadedFile.match(/\.(jpg|jpeg|png|webp)$/i) ? (
                          <a href={lead.uploadedFile} target="_blank" rel="noopener noreferrer" className="block w-12 h-12 rounded-lg overflow-hidden border border-white/10 hover:border-primary transition-colors">
                            <img src={lead.uploadedFile} alt="Design" className="w-full h-full object-cover" />
                          </a>
                        ) : (
                          <a href={lead.uploadedFile} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-xl border border-white/5 hover:border-primary transition-all text-primary flex items-center justify-center w-12 h-12">
                            <Download size={18} />
                          </a>
                        )}
                        <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">View File</span>
                      </div>
                    ) : (
                      <span className="text-[10px] font-bold text-white/10 italic">NO CONCEPT</span>
                    )}
                  </td>
                  <td className="px-8 py-7">
                    <div className="text-xs font-bold">{lead.email}</div>
                    <div className="text-xs text-accent font-bold">{lead.whatsapp}</div>
                  </td>
                  <td className="px-8 py-7">
                    <select value={lead.status} onChange={e => updateStatus(lead._id, e.target.value)} className="bg-background-dark border border-white/10 rounded-xl px-4 py-2 text-[10px] font-black uppercase focus:outline-none focus:border-primary transition-all">
                      <option value="new">NEW</option>
                      <option value="contacted">CONTACTED</option>
                      <option value="sampling">SAMPLING</option>
                      <option value="production">PRODUCTION</option>
                      <option value="completed">COMPLETED</option>
                    </select>
                  </td>
                  <td className="px-8 py-7 text-right relative">
                    <button onClick={e => { e.stopPropagation(); setOpenMenuId(openMenuId === lead._id ? null : lead._id); }} className="p-2.5 rounded-xl hover:bg-white/10 text-gray-500">
                      <MoreVertical size={18} />
                    </button>
                    <AnimatePresence>
                      {openMenuId === lead._id && (
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="absolute right-8 top-20 w-48 bg-background-dark border border-white/10 rounded-2xl shadow-2xl z-[60] p-2 text-left">
                          <button onClick={() => handleDelete(lead._id)} className="w-full flex items-center space-x-3 px-4 py-3 text-red-500 hover:bg-red-500/10 rounded-xl text-[10px] font-black uppercase">
                            <Trash2 size={14} /> <span>Delete Lead</span>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeadManagement;
