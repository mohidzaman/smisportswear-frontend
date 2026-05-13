import React, { useState, useEffect } from 'react';
import API from '../../api/axios';
import { Plus, Trash2 } from 'lucide-react';
import ImageUpload from '../components/ImageUpload';

const GalleryManagement = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newPhoto, setNewPhoto] = useState({ title: '', category: '', imageUrls: [] });

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const { data } = await API.get('/gallery');
      setPhotos(data);
    } catch (err) {
      console.error('Failed to fetch gallery:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (newPhoto.imageUrls.length === 0) {
      alert('Please upload at least one image');
      return;
    }
    try {
      await API.post('/gallery', newPhoto);
      setShowModal(false);
      setNewPhoto({ title: '', category: '', imageUrls: [] });
      fetchPhotos();
    } catch (err) {
      alert('Upload failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete photo?')) return;
    try {
      await API.delete(`/gallery/${id}`);
      fetchPhotos();
    } catch (err) {
      alert('Delete failed');
    }
  };

  if (loading) return <div className="h-64 flex items-center justify-center text-gray-500 font-black tracking-widest uppercase animate-pulse">Syncing Portfolio...</div>;

  return (
    <>
      <header className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter">Portfolio <span className="text-primary italic">Gallery</span></h1>
          <p className="text-gray-500 text-xs mt-1 uppercase tracking-widest font-bold">Manage Recent Mockups and Shipments</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center space-x-2 px-6 py-4 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-red-700 transition-all">
          <Plus size={16} />
          <span>Upload Photo</span>
        </button>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {photos.map((item, i) => (
          <div key={i} className="aspect-square bg-background-alt rounded-2xl border border-white/5 overflow-hidden group relative">
            <img src={item.imageUrls?.[0]} alt={item.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity text-white">
              <p className="text-[10px] font-black uppercase truncate">{item.title}</p>
              <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">{item.imageUrls?.length || 0} Assets</p>
            </div>
            <button onClick={() => handleDelete(item._id)} className="absolute top-3 right-3 p-2 bg-background-dark/80 rounded-lg text-primary hover:bg-primary hover:text-white transition-all opacity-0 group-hover:opacity-100">
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-background-alt rounded-3xl p-8 border border-white/10 animate-fade-in text-white">
            <h3 className="text-2xl font-black mb-6 uppercase tracking-tighter">UPLOAD <span className="text-primary italic">WORK</span></h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <input 
                placeholder="Project Title" 
                className="w-full bg-background-dark border border-white/10 rounded-xl p-4 text-xs font-bold focus:outline-none focus:border-primary text-white"
                value={newPhoto.title}
                onChange={e => setNewPhoto({...newPhoto, title: e.target.value})}
                required
              />
              <input 
                placeholder="Category (e.g. Teamwear)" 
                className="w-full bg-background-dark border border-white/10 rounded-xl p-4 text-xs font-bold focus:outline-none focus:border-primary text-white"
                value={newPhoto.category}
                onChange={e => setNewPhoto({...newPhoto, category: e.target.value})}
              />
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block ml-1">Gallery Media (Multiple)</label>
                <ImageUpload 
                  onUploadComplete={(urls) => setNewPhoto({...newPhoto, imageUrls: urls})} 
                  multiple={true}
                />
                {newPhoto.imageUrls.length > 0 && (
                  <p className="text-[10px] text-primary font-bold uppercase tracking-widest mt-2 animate-pulse">✓ {newPhoto.imageUrls.length} Assets Ready</p>
                )}
              </div>
              <div className="flex space-x-4 mt-8">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-4 bg-background-dark rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/5">Cancel</button>
                <button type="submit" className="flex-1 py-4 bg-primary rounded-xl text-[10px] font-black uppercase tracking-widest text-white">Upload Now</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default GalleryManagement;
