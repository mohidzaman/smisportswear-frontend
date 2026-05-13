import { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';

// Public Pages (Lazy Loaded)
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Products = lazy(() => import('./pages/Products'));
const Manufacturing = lazy(() => import('./pages/Manufacturing'));
const Customization = lazy(() => import('./pages/Customization'));
const HowToOrder = lazy(() => import('./pages/HowToOrder'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Contact = lazy(() => import('./pages/Contact'));

// Admin Pages (Lazy Loaded)
const AdminLayout = lazy(() => import('./admin/components/AdminLayout'));
const AdminLogin = lazy(() => import('./admin/pages/Login'));
const AdminDashboard = lazy(() => import('./admin/pages/Dashboard'));
const LeadManagement = lazy(() => import('./admin/pages/LeadManagement'));
const ProductManagement = lazy(() => import('./admin/pages/ProductManagement'));
const GalleryManagement = lazy(() => import('./admin/pages/GalleryManagement'));

import { AnimatePresence, motion } from 'framer-motion';
import TopProgressBar from './components/TopProgressBar';
import PageWrapper from './components/PageWrapper';

// Sleek Loading Fallback
const PageLoading = () => (
  <AnimatePresence mode="wait">
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9998] bg-background-dark/80 backdrop-blur-md flex items-center justify-center"
    >
      <TopProgressBar />
      <div className="flex flex-col items-center space-y-8">
        <div className="relative">
          <div className="w-20 h-20 border-2 border-primary/20 rounded-full"></div>
          <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-primary rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          </div>
        </div>
        <p className="text-[10px] font-black tracking-[0.6em] text-white/40 uppercase italic animate-pulse">
          Initializing <span className="text-primary">Elite</span> Core
        </p>
      </div>
    </motion.div>
  </AnimatePresence>
);

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');
  
  // STRICT_DEBUG: Safe auth state initialization
  const [auth, setAuth] = useState(() => {
    try {
      const stored = localStorage.getItem('adminInfo');
      const parsed = stored ? JSON.parse(stored) : null;
      console.log('🛡️ [INIT_AUTH] Stored Info Trace:', parsed ? 'Exists' : 'None');
      return parsed;
    } catch (e) {
      console.error('⚠️ [INIT_AUTH] FAILED parsing adminInfo:', e.message);
      return null;
    }
  });

  useEffect(() => {
    console.log('🚀 [INIT_APP] AppContent Mounted at:', location.pathname);
  }, []);

  return (
    <div className="min-h-screen bg-background-dark text-white flex flex-col font-body">
      {!isAdminPath && <Header />}
      <main className="flex-grow">
        <Suspense fallback={<PageLoading />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              {/* Public Routes */}
              <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
              <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
              <Route path="/products" element={<PageWrapper><Products /></PageWrapper>} />
              <Route path="/manufacturing" element={<PageWrapper><Manufacturing /></PageWrapper>} />
              <Route path="/customization" element={<PageWrapper><Customization /></PageWrapper>} />
              <Route path="/how-to-order" element={<PageWrapper><HowToOrder /></PageWrapper>} />
              <Route path="/gallery" element={<PageWrapper><Gallery /></PageWrapper>} />
              <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
              
              {/* Admin Auth Route */}
              <Route path="/admin/login" element={<AdminLogin setAuth={setAuth} />} />

              {/* Protected Admin Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="leads" element={<LeadManagement />} />
                <Route path="products" element={<ProductManagement />} />
                <Route path="gallery" element={<GalleryManagement />} />
              </Route>
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>
      {!isAdminPath && <Footer />}
      {!isAdminPath && <FloatingWhatsApp />}
    </div>
  );
}

export default App;
