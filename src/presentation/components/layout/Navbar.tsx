import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Phone, 
  ShoppingCart, 
  Menu, 
  X, 
  ChevronDown, 
  Cpu, 
  Layers, 
  Flame, 
  Activity,
  ArrowRight,
  Send
} from 'lucide-react';
import { useRFQ } from '../../context/RFQContext';
import { companyData } from '../../../infrastructure/data/company.data';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [brandsDropdownOpen, setBrandsDropdownOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const { totalItemCount, openDrawer } = useRFQ();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0A0F1D]/95 backdrop-blur-md border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Official Brand Logo */}
          <Link to="/" className="flex items-center shrink-0 py-2">
            <img 
              src="/images/logo.png" 
              alt="Ambica Engineers & Lubricants Pvt Ltd" 
              className="h-10 w-auto object-contain brightness-115 drop-shadow-[0_2px_10px_rgba(239,125,1,0.2)]" 
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </Link>

          {/* Clean Desktop Navigation (5 balanced items) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {/* Products Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setProductsDropdownOpen(true)}
              onMouseLeave={() => setProductsDropdownOpen(false)}
            >
              <Link
                to="/products"
                className={`px-3 py-1.5 text-sm font-medium rounded-lg inline-flex items-center gap-1 transition-colors ${
                  isActive('/products') 
                    ? 'text-[#EF7D01] bg-white/5' 
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                Products
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 transition-transform duration-150" />
              </Link>

              {productsDropdownOpen && (
                <div className="absolute top-full left-0 w-72 bg-[#0A0F1D] border border-slate-800 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="py-1">
                    <Link
                      to="/products?category=hydraulic-pumps"
                      onClick={() => setProductsDropdownOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                      <Cpu className="w-4 h-4 text-[#EF7D01]" />
                      <div>
                        <div className="font-medium text-slate-200">Hydraulic Pumps</div>
                        <div className="text-[11px] text-slate-400">Piston & Gear Pumps</div>
                      </div>
                    </Link>
                    <Link
                      to="/products?category=hydraulic-motors"
                      onClick={() => setProductsDropdownOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                      <Activity className="w-4 h-4 text-sky-400" />
                      <div>
                        <div className="font-medium text-slate-200">Hydraulic Motors</div>
                        <div className="text-[11px] text-slate-400">Bent Axis & Plug-in Units</div>
                      </div>
                    </Link>
                    <Link
                      to="/products?category=hydraulic-valves"
                      onClick={() => setProductsDropdownOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                      <Layers className="w-4 h-4 text-emerald-400" />
                      <div>
                        <div className="font-medium text-slate-200">Hydraulic Valves</div>
                        <div className="text-[11px] text-slate-400">Solenoid, Modular, Proportional</div>
                      </div>
                    </Link>
                    <Link
                      to="/products?category=cushion-pads"
                      onClick={() => setProductsDropdownOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                      <Flame className="w-4 h-4 text-[#EF7D01]" />
                      <div>
                        <div className="font-medium text-slate-200">Cushion Pads</div>
                        <div className="text-[11px] text-slate-400">European Press Line Pads</div>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2 border-t border-slate-800/80">
                    <Link 
                      to="/products"
                      onClick={() => setProductsDropdownOpen(false)}
                      className="text-xs text-[#EF7D01] hover:text-[#D66D00] flex items-center justify-between font-semibold px-2 py-1 transition-colors"
                    >
                      Browse Complete Spares Catalog <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Solutions Link */}
            <Link
              to="/solutions/wood-panel"
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                isActive('/solutions') 
                  ? 'text-[#EF7D01] bg-white/5' 
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Solutions
            </Link>

            {/* Brands Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setBrandsDropdownOpen(true)}
              onMouseLeave={() => setBrandsDropdownOpen(false)}
            >
              <button
                className={`px-3 py-1.5 text-sm font-medium rounded-lg inline-flex items-center gap-1 transition-colors cursor-pointer ${
                  isActive('/brands') 
                    ? 'text-[#EF7D01] bg-white/5' 
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                Brands
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 transition-transform duration-150" />
              </button>

              {brandsDropdownOpen && (
                <div className="absolute top-full left-0 w-60 bg-[#0A0F1D] border border-slate-800 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="text-[11px] font-mono font-semibold text-[#EF7D01] uppercase tracking-wider px-3 py-1.5 border-b border-slate-800/80">
                    OEM Partner Brands
                  </div>
                  <div className="py-1">
                    <Link to="/brands/rexroth" onClick={() => setBrandsDropdownOpen(false)} className="block px-3 py-1.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                      Bosch Rexroth
                    </Link>
                    <Link to="/brands/polyhydron" onClick={() => setBrandsDropdownOpen(false)} className="block px-3 py-1.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                      Polyhydron
                    </Link>
                    <Link to="/brands/nachi" onClick={() => setBrandsDropdownOpen(false)} className="block px-3 py-1.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                      Nachi (Fujikoshi)
                    </Link>
                    <Link to="/brands/huade" onClick={() => setBrandsDropdownOpen(false)} className="block px-3 py-1.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                      Huade Hydraulic
                    </Link>
                    <Link to="/brands/voith" onClick={() => setBrandsDropdownOpen(false)} className="block px-3 py-1.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                      Voith Turbo
                    </Link>
                    <Link to="/brands/veljan" onClick={() => setBrandsDropdownOpen(false)} className="block px-3 py-1.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                      Veljan / Sarva
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* About Dropdown (About + Events) */}
            <div 
              className="relative"
              onMouseEnter={() => setAboutDropdownOpen(true)}
              onMouseLeave={() => setAboutDropdownOpen(false)}
            >
              <Link
                to="/about-us"
                className={`px-3 py-1.5 text-sm font-medium rounded-lg inline-flex items-center gap-1 transition-colors ${
                  isActive('/about-us') || isActive('/events') 
                    ? 'text-[#EF7D01] bg-white/5' 
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                About
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 transition-transform duration-150" />
              </Link>

              {aboutDropdownOpen && (
                <div className="absolute top-full left-0 w-56 bg-[#0A0F1D] border border-slate-800 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="py-1">
                    <Link 
                      to="/about-us" 
                      onClick={() => setAboutDropdownOpen(false)} 
                      className="block px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                      <div className="font-medium text-slate-200">Company Overview</div>
                      <div className="text-[11px] text-slate-400">Legacy, Vision &amp; Leadership</div>
                    </Link>
                    <Link 
                      to="/events" 
                      onClick={() => setAboutDropdownOpen(false)} 
                      className="block px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                      <div className="font-medium text-slate-200">Exhibitions &amp; Expos</div>
                      <div className="text-[11px] text-slate-400">IndiaWood, Matecia, Delhiwood</div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Contact */}
            <Link
              to="/contact"
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                isActive('/contact') 
                  ? 'text-[#EF7D01] bg-white/5' 
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Action Icons: Phone + WhatsApp + RFQ Button */}
          <div className="flex items-center gap-3">
            {/* Quick Contact Link (Direct, quiet, elegant) */}
            <a 
              href={`tel:${companyData.contact.primaryPhone.replace(/\s+/g, '')}`} 
              className="hidden xl:flex items-center gap-1.5 text-xs text-slate-300 hover:text-[#EF7D01] transition-colors font-mono py-1 px-2.5 rounded-lg hover:bg-white/5"
              title="Call Technical Support"
            >
              <Phone className="w-3.5 h-3.5 text-[#EF7D01]" />
              <span>{companyData.contact.primaryPhone}</span>
            </a>

            {/* Direct WhatsApp Quick Chat */}
            <a
              href={`https://wa.me/${companyData.contact.whatsappNumber}?text=${encodeURIComponent("Hello Ambica Engineers team, I would like to inquire about hydraulic spares and engineering solutions.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center justify-center text-slate-300 hover:text-emerald-400 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              title="WhatsApp Engineering Chat"
              aria-label="WhatsApp Engineering Chat"
            >
              <Send className="w-4 h-4" />
            </a>

            {/* Primary Action: RFQ Cart Button */}
            <button
              onClick={openDrawer}
              className="py-2 px-3.5 rounded-lg bg-[#EF7D01] hover:bg-[#D66D00] text-white font-semibold transition-all flex items-center gap-2 text-xs cursor-pointer shadow-sm hover:shadow-md hover:shadow-orange-500/20 active:scale-[0.98]"
              aria-label="View RFQ Cart"
            >
              <ShoppingCart className="w-3.5 h-3.5 text-white" />
              <span className="tracking-tight hidden xs:inline">RFQ Cart</span>
              {totalItemCount > 0 ? (
                <span className="bg-white text-[#EF7D01] text-[10px] font-mono font-bold rounded-full h-4 min-w-4 px-1 flex items-center justify-center">
                  {totalItemCount}
                </span>
              ) : null}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Clean Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A0F1D] border-b border-slate-800 px-5 pt-3 pb-6 space-y-2 animate-in fade-in slide-in-from-top-2 duration-150">
          <Link
            to="/products"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-200 hover:text-[#EF7D01] transition-colors border-b border-slate-800/60"
          >
            Products Catalog
          </Link>
          <div className="grid grid-cols-2 gap-2 pl-2 pb-2 text-xs text-slate-400">
            <Link to="/products?category=hydraulic-pumps" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#EF7D01] py-1">
              • Hydraulic Pumps
            </Link>
            <Link to="/products?category=hydraulic-motors" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#EF7D01] py-1">
              • Hydraulic Motors
            </Link>
            <Link to="/products?category=hydraulic-valves" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#EF7D01] py-1">
              • Hydraulic Valves
            </Link>
            <Link to="/products?category=cushion-pads" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#EF7D01] py-1">
              • Cushion Pads
            </Link>
          </div>

          <Link
            to="/solutions/wood-panel"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-200 hover:text-[#EF7D01] transition-colors border-b border-slate-800/60"
          >
            Wood Panel Solutions
          </Link>

          <Link
            to="/products"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-200 hover:text-[#EF7D01] transition-colors border-b border-slate-800/60"
          >
            Authorized Brands
          </Link>

          <Link
            to="/about-us"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-200 hover:text-[#EF7D01] transition-colors border-b border-slate-800/60"
          >
            About Us
          </Link>

          <Link
            to="/events"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-200 hover:text-[#EF7D01] transition-colors border-b border-slate-800/60"
          >
            Exhibitions &amp; Expos
          </Link>

          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-200 hover:text-[#EF7D01] transition-colors"
          >
            Contact &amp; Noida Desk
          </Link>

          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
            <a 
              href={`tel:${companyData.contact.primaryPhone.replace(/\s+/g, '')}`} 
              className="flex items-center gap-1.5 text-slate-300 hover:text-[#EF7D01]"
            >
              <Phone className="w-3.5 h-3.5 text-[#EF7D01]" />
              {companyData.contact.primaryPhone}
            </a>
            <a
              href={`https://wa.me/${companyData.contact.whatsappNumber}?text=${encodeURIComponent("Hello Ambica Engineers team, I would like to inquire about hydraulic spares.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 font-semibold"
            >
              WhatsApp Support →
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
