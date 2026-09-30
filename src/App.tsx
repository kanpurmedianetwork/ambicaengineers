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
              <Route path="/about" element={<AboutPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:slug" element={<ProductDetailPage />} />
              <Route path="/product-page/:slug" element={<ProductDetailPage />} />
              <Route path="/items/:slug" element={<ProductDetailPage />} />
              <Route path="/brands/:brandId" element={<BrandPage />} />
              <Route path="/solutions/wood-panel" element={<WoodPanelSolutionsPage />} />
              <Route path="/wood-panel-solutions" element={<WoodPanelSolutionsPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />

              {/* Backward compatibility with old Wix routes */}
              <Route path="/blank-38" element={<Navigate to="/events" replace />} />
              <Route path="/blank-18" element={<Navigate to="/events" replace />} />
              <Route path="/blank-19" element={<Navigate to="/events" replace />} />
              <Route path="/blank-17" element={<Navigate to="/events" replace />} />
              <Route path="/blank-24" element={<Navigate to="/products/cushion-pad-silicon-copper" replace />} />
              <Route path="/blank-16" element={<Navigate to="/contact" replace />} />
              <Route path="/blank" element={<Navigate to="/brands/rexroth" replace />} />
              <Route path="/blank-9" element={<Navigate to="/brands/polyhydron" replace />} />
              <Route path="/blank-10" element={<Navigate to="/brands/polyhydron" replace />} />
              <Route path="/blank-11" element={<Navigate to="/brands/nachi" replace />} />
              <Route path="/blank-12" element={<Navigate to="/brands/nachi" replace />} />
              <Route path="/blank-13" element={<Navigate to="/brands/huade" replace />} />
              <Route path="/blank-14" element={<Navigate to="/brands/huade" replace />} />
              <Route path="/blank-15" element={<Navigate to="/brands/voith" replace />} />
              <Route path="/hydraulic-pump-2" element={<Navigate to="/products?category=hydraulic-pumps" replace />} />
              <Route path="/hydraulic-pump-2-list" element={<Navigate to="/products?category=hydraulic-pumps" replace />} />
              <Route path="/hydraulic-motor-2" element={<Navigate to="/products?category=hydraulic-motors" replace />} />
              <Route path="/hydrualics-valves" element={<Navigate to="/products?category=hydraulic-valves" replace />} />
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
