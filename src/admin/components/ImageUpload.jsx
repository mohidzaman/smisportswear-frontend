"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { Upload, X, Image as ImageIcon, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API from '../../api/axios';

const ImageUpload = ({ onUploadComplete, multiple = false, initialImages = [] }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  // Handle file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    validateAndProcessFiles(files);
  };

  const validateAndProcessFiles = (files) => {
    setError(null);
    const validFiles = files.filter(file => {
      const isValid = ['image/jpeg', 'image/png', 'image/webp'].includes(file.mimetype || file.type);
      const isSmallEnough = file.size <= 5 * 1024 * 1024; // 5MB
      return isValid && isSmallEnough;
    });

    if (validFiles.length !== files.length) {
      setError("Some files were skipped. Only JPG, PNG, WebP < 5MB allowed.");
    }

    if (multiple) {
      const newFiles = [...selectedFiles, ...validFiles].slice(0, 10);
      setSelectedFiles(newFiles);
    } else {
      setSelectedFiles([validFiles[0]]);
    }
  };

  // Generate previews
  useEffect(() => {
    const newPreviews = selectedFiles.map(file => URL.createObjectURL(file));
    setPreviews(newPreviews);
    // Cleanup
    return () => newPreviews.forEach(url => URL.revokeObjectURL(url));
  }, [selectedFiles]);

  const removeFile = (index) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;
    setUploading(true);
    setProgress(0);
    setError(null);

    const formData = new FormData();
    if (multiple) {
      selectedFiles.forEach(file => formData.append('images', file));
    } else {
      formData.append('image', selectedFiles[0]);
    }

    try {
      const endpoint = multiple ? '/upload/multiple' : '/upload/single';
      const { data } = await API.post(endpoint, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percentCompleted);
        }
      });

      onUploadComplete(multiple ? data.urls : data.url);
      setSelectedFiles([]); // Clear after success
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed. Please check server logs.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div 
        className={`relative border-2 border-dashed rounded-3xl p-12 transition-all duration-500 flex flex-col items-center justify-center text-center group
          ${selectedFiles.length > 0 ? 'border-primary/40 bg-primary/5' : 'border-white/10 hover:border-primary/20 bg-background-dark'}`}
      >
        <input 
          type="file" 
          multiple={multiple}
          onChange={handleFileChange}
          className="absolute inset-0 opacity-0 cursor-pointer z-10"
          accept="image/jpeg,image/png,image/webp"
        />
        
        <div className="p-4 bg-white/5 rounded-2xl mb-4 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-500">
          <Upload className={`${selectedFiles.length > 0 ? 'text-primary' : 'text-gray-500'}`} size={32} />
        </div>
        
        <h4 className="text-sm font-black uppercase tracking-widest text-white mb-2 italic">
          {selectedFiles.length > 0 ? `${selectedFiles.length} File(s) Ready` : 'Drop Image Here'}
        </h4>
        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-relaxed">
          OR CLICK TO BROWSE <br /> (JPG, PNG, WEBP • MAX 5MB)
        </p>
      </div>

      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-[10px] font-black uppercase tracking-widest"
        >
          <AlertCircle size={16} />
          <span>{error}</span>
        </motion.div>
      )}

      {/* Previews */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
        <AnimatePresence>
          {previews.map((url, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative aspect-square rounded-2xl overflow-hidden border border-white/5 group"
            >
              <img src={url} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Preview" />
              <button 
                onClick={() => removeFile(i)}
                className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-lg text-white hover:bg-primary transition-colors opacity-0 group-hover:opacity-100"
              >
                <X size={12} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {selectedFiles.length > 0 && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleUpload}
          disabled={uploading}
          className={`w-full py-4 rounded-xl text-xs font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center space-x-3
            ${uploading ? 'bg-white/5 text-gray-500' : 'bg-primary text-white shadow-xl hover:bg-red-700'}`}
        >
          {uploading ? (
            <>
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span>UPLOADING {progress}%</span>
            </>
          ) : (
            <>
              <CheckCircle2 size={16} />
              <span>START UPLOAD</span>
            </>
          )}
        </motion.button>
      )}
    </div>
  );
};

export default ImageUpload;
