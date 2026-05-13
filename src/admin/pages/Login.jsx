import React, { useState } from 'react';
import API from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { Lock, User, ShieldAlert } from 'lucide-react';


const AdminLogin = ({ setAuth }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const { data } = await API.post('/admin/login', { username, password });
      localStorage.setItem('adminInfo', JSON.stringify(data));
      if (setAuth) setAuth(data);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-dark flex items-center justify-center px-4 font-body">
      <div className="max-w-md w-full bg-background-alt p-8 rounded-3xl border border-white/5 shadow-2xl animate-fade-in text-white">
        <div className="text-center mb-10">
          <div className="bg-primary/20 p-4 rounded-2xl inline-block mb-4">
            <Lock size={32} className="text-primary" />
          </div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter">ADMIN <span className="text-primary italic">PORTAL</span></h1>
          <p className="text-gray-500 text-xs mt-2 uppercase tracking-widest font-bold">Authorized Personnel Only</p>
        </div>

        {error && (
          <div className="bg-primary/10 border border-primary/20 text-primary p-4 rounded-xl flex items-center mb-6 text-xs font-bold uppercase animate-slide-up">
            <ShieldAlert size={16} className="mr-3" />
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 px-1">Username</label>
            <div className="relative">
              <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full bg-background-dark border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary transition-all font-bold"
                placeholder="Manager ID"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 px-1">Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-background-dark border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary transition-all font-bold"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary hover:bg-red-700 text-white font-black py-4 rounded-xl transition-all uppercase tracking-[0.1em] shadow-lg shadow-primary/20 disabled:opacity-50"
          >
            {loading ? 'AUTHENTICATING...' : 'SECURE LOGIN'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
