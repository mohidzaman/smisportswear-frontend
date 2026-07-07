"use client";

import React, { useState, useEffect } from 'react';
import API from '../../api/axios';
import { Plus, Trash2 } from 'lucide-react';
import ImageUpload from '../components/ImageUpload';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ title: '', category: 'Teamwear', image: '', description: '' });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await API.get('/products');
      setProducts(data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await API.post('/products', newProduct);
      setShowModal(false);
      setNewProduct({ title: '', category: 'Teamwear', image: '', description: '' });
      fetchProducts();
    } catch (err) {
      alert('Failed to add product');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await API.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      alert('Delete failed');
    }
  };

  if (loading) return <div className="h-64 flex items-center justify-center text-gray-500 font-black uppercase tracking-widest animate-pulse">Loading Inventory...</div>;

  return (
    <>
      <header className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter">Product <span className="text-primary italic">Catalog</span></h1>
          <p className="text-gray-500 text-xs mt-1 uppercase tracking-widest font-bold">Manage Public Website Categories</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center space-x-2 px-6 py-4 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-red-700 transition-all">
          <Plus size={16} />
          <span>Add Product</span>
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((prod, i) => (
          <div key={i} className="bg-background-alt rounded-2xl border border-white/5 overflow-hidden group">
            <div className="h-40 relative">
              <img src={prod.image} alt={prod.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
              <button onClick={() => handleDelete(prod._id)} className="absolute top-4 right-4 p-2 bg-background-dark/80 rounded-lg text-primary hover:bg-primary hover:text-white transition-all opacity-0 group-hover:opacity-100">
                <Trash2 size={16} />
              </button>
            </div>
            <div className="p-4">
              <span className="text-[10px] font-black text-primary uppercase tracking-widest">{prod.category}</span>
              <h4 className="font-bold text-sm uppercase mt-1">{prod.title}</h4>
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-background-alt rounded-3xl p-8 border border-white/10 animate-fade-in text-white">
            <h3 className="text-2xl font-black mb-6 uppercase tracking-tighter">NEW <span className="text-primary italic">PRODUCT</span></h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <input 
                placeholder="Product Title" 
                className="w-full bg-background-dark border border-white/10 rounded-xl p-4 text-xs font-bold focus:outline-none focus:border-primary text-white"
                value={newProduct.title}
                onChange={e => setNewProduct({...newProduct, title: e.target.value})}
                required
              />
              <select 
                className="w-full bg-background-dark border border-white/10 rounded-xl p-4 text-xs font-bold focus:outline-none focus:border-primary text-white"
                value={newProduct.category}
                onChange={e => setNewProduct({...newProduct, category: e.target.value})}
              >
                <option value="Teamwear">TEAMWEAR</option>
                <option value="Training Wear">TRAINING WEAR</option>
                <option value="School Sports">SCHOOL SPORTS</option>
                <option value="Private Label">PRIVATE LABEL</option>
              </select>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block ml-1">Product Media</label>
                <ImageUpload 
                  onUploadComplete={(url) => setNewProduct({...newProduct, image: url})} 
                  multiple={false}
                />
                {newProduct.image && (
                  <p className="text-[10px] text-primary font-bold uppercase tracking-widest mt-2 animate-pulse">✓ Asset Ready for Save</p>
                )}
              </div>
              <textarea 
                placeholder="Short Description" 
                className="w-full bg-background-dark border border-white/10 rounded-xl p-4 text-xs font-bold focus:outline-none focus:border-primary h-24 text-white"
                value={newProduct.description}
                onChange={e => setNewProduct({...newProduct, description: e.target.value})}
              />
              <div className="flex space-x-4 mt-8">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-4 bg-background-dark rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/5">Cancel</button>
                <button type="submit" className="flex-1 py-4 bg-primary rounded-xl text-[10px] font-black uppercase tracking-widest text-white">Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductManagement;
