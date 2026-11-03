import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RFQProvider } from './presentation/context/RFQContext';
import { Navbar } from './presentation/components/layout/Navbar';
import { Footer } from './presentation/components/layout/Footer';
import { RFQDrawer } from './presentation/components/rfq/RFQDrawer';
import { FloatingRFQButton } from './presentation/components/rfq/FloatingRFQButton';

import { HomePage } from './presentation/pages/HomePage';
import { AboutPage } from './presentation/pages/AboutPage';
import { ProductsPage } from './presentation/pages/ProductsPage';
import { ProductDetailPage } from './presentation/pages/ProductDetailPage';
import { BrandPage } from './presentation/pages/BrandPage';
import { BrandsPage } from './presentation/pages/BrandsPage';
import { WoodPanelSolutionsPage } from './presentation/pages/WoodPanelSolutionsPage';
import { EventsPage } from './presentation/pages/EventsPage';
import { ContactPage } from './presentation/pages/ContactPage';
import { PrivacyPolicyPage } from './presentation/pages/PrivacyPolicyPage';
import { NotFoundPage } from './presentation/pages/NotFoundPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about-us" element={<AboutPage />} />
      <Route path="/about" element={<Navigate to="/about-us" replace />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:slug" element={<ProductDetailPage />} />
      <Route path="/product-page/:slug" element={<ProductDetailPage />} />
      <Route path="/items/:slug" element={<ProductDetailPage />} />
      <Route path="/brands" element={<BrandsPage />} />
      <Route path="/brands/:brandId" element={<BrandPage />} />
      <Route path="/solutions/wood-panel" element={<WoodPanelSolutionsPage />} />
      <Route path="/wood-panel-solutions" element={<Navigate to="/solutions/wood-panel" replace />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export const AppContent: React.FC = () => {
  return (
    <RFQProvider>
      <div className="min-h-screen flex flex-col bg-[#0A0F1D] text-slate-900 selection:bg-[#EF7D01] selection:text-white font-sans antialiased">
        <Navbar />
        <main className="flex-1">
          <AppRoutes />
        </main>
        <Footer />
        <RFQDrawer />
        <FloatingRFQButton />
      </div>
    </RFQProvider>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
