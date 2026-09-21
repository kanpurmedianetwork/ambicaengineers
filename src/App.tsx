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
import { WoodPanelSolutionsPage } from './presentation/pages/WoodPanelSolutionsPage';
import { EventsPage } from './presentation/pages/EventsPage';
import { ContactPage } from './presentation/pages/ContactPage';
import { PrivacyPolicyPage } from './presentation/pages/PrivacyPolicyPage';

export const App: React.FC = () => {
  return (
    <RFQProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 selection:bg-[#EF7D01] selection:text-white font-sans antialiased">
          <Navbar />
          
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about-us" element={<AboutPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:slug" element={<ProductDetailPage />} />
              <Route path="/brands/:brandId" element={<BrandPage />} />
              <Route path="/solutions/wood-panel" element={<WoodPanelSolutionsPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />

              {/* Backward compatibility with old Wix slugs */}
              <Route path="/blank-24" element={<Navigate to="/products/cushion-pad-silicon-copper" replace />} />
              <Route path="/blank-16" element={<Navigate to="/contact" replace />} />
              <Route path="/projects" element={<Navigate to="/events" replace />} />
              <Route path="/home" element={<Navigate to="/" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <Footer />
          <RFQDrawer />
          <FloatingRFQButton />
        </div>
      </BrowserRouter>
    </RFQProvider>
  );
};

export default App;
