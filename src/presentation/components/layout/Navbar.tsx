import React, { useState, useEffect } from 'react';
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
  const [scrolled, setScrolled] = useState(false);
  const { totalItemCount, openDrawer } = useRFQ();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 -mb-20 ${
      scrolled 
        ? 'bg-[#0A0F1D]/35 backdrop-blur-2xl border-b border-white/10 shadow-lg shadow-black/20' 
        : 'bg-transparent border-b border-transparent shadow-none'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Official Brand Logo */}
          <Link to="/" className="flex items-center shrink-0 py-2">
            <img 
              src="/images/logo.png" 
              alt="Ambica Engineers & Lubricants Pvt Ltd" 
              className="h-11 sm:h-12 w-auto object-contain brightness-115 drop-shadow-[0_2px_12px_rgba(239,125,1,0.25)]" 
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </Link>

          {/* Clean Desktop Navigation (5 balanced items with larger executive typography) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {/* Products Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setProductsDropdownOpen(true)}
              onMouseLeave={() => setProductsDropdownOpen(false)}
            >
              <Link
                to="/products"
                className={`px-3.5 py-2 text-[15px] xl:text-[16px] font-semibold rounded-xl inline-flex items-center gap-1.5 transition-all duration-150 tracking-normal ${
                  isActive('/products') 
                    ? 'text-[#EF7D01] bg-[#EF7D01]/10 font-bold shadow-xs' 
                    : 'text-slate-200 hover:text-white hover:bg-white/10'
                }`}
              >
                Products
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-white transition-transform duration-150" />
              </Link>

              {productsDropdownOpen && (
                <div className="absolute top-full left-0 w-80 bg-[#0A0F1D]/85 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl p-2.5 z-50 ring-1 ring-white/10 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="text-[11px] font-mono font-bold text-[#EF7D01] uppercase tracking-wider px-3 py-1.5 border-b border-white/10 mb-1 flex items-center justify-between">
                    <span>Industrial Product Lines</span>
                    <span className="text-[10px] text-slate-400 font-normal">350-Bar Heavy Duty</span>
                  </div>
                  <div className="py-1 space-y-0.5">
                    <Link
                      to="/products?category=hydraulic-pumps"
                      onClick={() => setProductsDropdownOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0 border border-orange-500/20">
                        <Cpu className="w-4 h-4 text-[#EF7D01]" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-100 text-[14px]">Hydraulic Pumps</div>
                        <div className="text-[12px] text-slate-400">Piston &amp; Gear Pumps (Rexroth, Nachi)</div>
                      </div>
                    </Link>
                    <Link
                      to="/products?category=hydraulic-motors"
                      onClick={() => setProductsDropdownOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center shrink-0 border border-sky-500/20">
                        <Activity className="w-4 h-4 text-sky-400" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-100 text-[14px]">Hydraulic Motors</div>
                        <div className="text-[12px] text-slate-400">Bent Axis &amp; Plug-in Drive Units</div>
                      </div>
                    </Link>
                    <Link
                      to="/products?category=hydraulic-valves"
                      onClick={() => setProductsDropdownOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20">
                        <Layers className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-100 text-[14px]">Hydraulic Valves</div>
                        <div className="text-[12px] text-slate-400">Solenoid, Modular, Proportional Units</div>
                      </div>
                    </Link>
                    <Link
                      to="/products?category=cushion-pads"
                      onClick={() => setProductsDropdownOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0 border border-orange-500/20">
                        <Flame className="w-4 h-4 text-[#EF7D01]" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-100 text-[14px]">Cushion Pads</div>
                        <div className="text-[12px] text-slate-400">European Press Line Pads (Silicon/Copper)</div>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2 pt-2.5 border-t border-white/10 mt-1">
                    <Link 
                      to="/products"
                      onClick={() => setProductsDropdownOpen(false)}
                      className="text-[13px] text-[#EF7D01] hover:text-[#D66D00] flex items-center justify-between font-bold px-2 py-1 transition-colors"
                    >
                      Browse Complete Spares Catalog <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Solutions Link */}
            <Link
              to="/solutions/wood-panel"
              className={`px-3.5 py-2 text-[15px] xl:text-[16px] font-semibold rounded-xl transition-all duration-150 tracking-normal ${
                isActive('/solutions') 
                  ? 'text-[#EF7D01] bg-[#EF7D01]/10 font-bold shadow-xs' 
                  : 'text-slate-200 hover:text-white hover:bg-white/10'
              }`}
            >
              Solutions
            </Link>

            {/* Brands Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setBrandsDropdownOpen(true)}
              onMouseLeave={() => setBrandsDropdownOpen(false)}
            >
              <button
                className={`px-3.5 py-2 text-[15px] xl:text-[16px] font-semibold rounded-xl inline-flex items-center gap-1.5 transition-all duration-150 tracking-normal cursor-pointer ${
                  isActive('/brands') 
                    ? 'text-[#EF7D01] bg-[#EF7D01]/10 font-bold shadow-xs' 
                    : 'text-slate-200 hover:text-white hover:bg-white/10'
                }`}
              >
                Brands
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-white transition-transform duration-150" />
              </button>

              {brandsDropdownOpen && (
                <div className="absolute top-full left-0 w-64 bg-[#0A0F1D]/85 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl p-2.5 z-50 ring-1 ring-white/10 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="text-[11px] font-mono font-bold text-[#EF7D01] uppercase tracking-wider px-3 py-1.5 border-b border-white/10 mb-1">
                    OEM Partner Brands
                  </div>
                  <div className="py-1 space-y-0.5">
                    <Link to="/brands/rexroth" onClick={() => setBrandsDropdownOpen(false)} className="block px-3 py-2 text-[14px] font-medium text-slate-200 hover:text-white hover:bg-white/10 rounded-xl transition-colors">
                      Bosch Rexroth
                    </Link>
                    <Link to="/brands/polyhydron" onClick={() => setBrandsDropdownOpen(false)} className="block px-3 py-2 text-[14px] font-medium text-slate-200 hover:text-white hover:bg-white/10 rounded-xl transition-colors">
                      Polyhydron
                    </Link>
                    <Link to="/brands/nachi" onClick={() => setBrandsDropdownOpen(false)} className="block px-3 py-2 text-[14px] font-medium text-slate-200 hover:text-white hover:bg-white/10 rounded-xl transition-colors">
                      Nachi (Fujikoshi)
                    </Link>
                    <Link to="/brands/huade" onClick={() => setBrandsDropdownOpen(false)} className="block px-3 py-2 text-[14px] font-medium text-slate-200 hover:text-white hover:bg-white/10 rounded-xl transition-colors">
                      Huade Hydraulic
                    </Link>
                    <Link to="/brands/voith" onClick={() => setBrandsDropdownOpen(false)} className="block px-3 py-2 text-[14px] font-medium text-slate-200 hover:text-white hover:bg-white/10 rounded-xl transition-colors">
                      Voith Turbo
                    </Link>
                    <Link to="/brands/veljan" onClick={() => setBrandsDropdownOpen(false)} className="block px-3 py-2 text-[14px] font-medium text-slate-200 hover:text-white hover:bg-white/10 rounded-xl transition-colors">
                      Veljan / Sarva
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* About Dropdown (About + Events) */}
            <div 
              className="relative group"
              onMouseEnter={() => setAboutDropdownOpen(true)}
              onMouseLeave={() => setAboutDropdownOpen(false)}
            >
              <Link
                to="/about-us"
                className={`px-3.5 py-2 text-[15px] xl:text-[16px] font-semibold rounded-xl inline-flex items-center gap-1.5 transition-all duration-150 tracking-normal ${
                  isActive('/about-us') || isActive('/events') 
                    ? 'text-[#EF7D01] bg-[#EF7D01]/10 font-bold shadow-xs' 
                    : 'text-slate-200 hover:text-white hover:bg-white/10'
                }`}
              >
                About
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-white transition-transform duration-150" />
              </Link>

              {aboutDropdownOpen && (
                <div className="absolute top-full left-0 w-64 bg-[#0A0F1D]/85 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl p-2.5 z-50 ring-1 ring-white/10 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="py-1 space-y-1">
                    <Link 
                      to="/about-us" 
                      onClick={() => setAboutDropdownOpen(false)} 
                      className="block px-3 py-2.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                    >
                      <div className="font-semibold text-slate-100 text-[14px]">Company Overview</div>
                      <div className="text-[12px] text-slate-400">Legacy, Vision &amp; CMD Address</div>
                    </Link>
                    <Link 
                      to="/events" 
                      onClick={() => setAboutDropdownOpen(false)} 
                      className="block px-3 py-2.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                    >
                      <div className="font-semibold text-slate-100 text-[14px]">Exhibitions &amp; Expos</div>
                      <div className="text-[12px] text-slate-400">IndiaWood, Matecia, Delhiwood</div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Contact */}
            <Link
              to="/contact"
              className={`px-3.5 py-2 text-[15px] xl:text-[16px] font-semibold rounded-xl transition-all duration-150 tracking-normal ${
                isActive('/contact') 
                  ? 'text-[#EF7D01] bg-[#EF7D01]/10 font-bold shadow-xs' 
                  : 'text-slate-200 hover:text-white hover:bg-white/10'
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
              className="hidden xl:flex items-center gap-2 text-sm text-slate-200 hover:text-[#EF7D01] transition-all font-mono font-medium py-2 px-3 rounded-xl bg-white/[0.04] hover:bg-white/10 border border-white/10"
              title="Call Technical Support"
            >
              <Phone className="w-4 h-4 text-[#EF7D01]" />
              <span>{companyData.contact.primaryPhone}</span>
            </a>

            {/* Direct WhatsApp Quick Chat */}
            <a
              href={`https://wa.me/${companyData.contact.whatsappNumber}?text=${encodeURIComponent("Hello Ambica Engineers team, I would like to inquire about hydraulic spares and engineering solutions.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center justify-center text-slate-300 hover:text-emerald-400 p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/10 transition-colors border border-white/10 cursor-pointer"
              title="WhatsApp Engineering Chat"
              aria-label="WhatsApp Engineering Chat"
            >
              <Send className="w-4 h-4" />
            </a>

            {/* Primary Action: RFQ Cart Button */}
            <button
              onClick={openDrawer}
              className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#EF7D01] to-[#D66D00] hover:from-[#f08513] hover:to-[#be6100] text-white font-bold transition-all flex items-center gap-2.5 text-[14px] cursor-pointer shadow-md hover:shadow-lg hover:shadow-orange-500/25 active:scale-[0.98]"
              aria-label="View RFQ Cart"
            >
              <ShoppingCart className="w-4 h-4 text-white" />
              <span className="tracking-tight hidden xs:inline">RFQ Cart</span>
              {totalItemCount > 0 ? (
                <span className="bg-white text-[#EF7D01] text-[11px] font-mono font-extrabold rounded-full h-5 min-w-5 px-1.5 flex items-center justify-center shadow-xs">
                  {totalItemCount}
                </span>
              ) : null}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/10 transition-colors cursor-pointer border border-white/10"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Clean Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A0F1D]/90 backdrop-blur-2xl border-b border-white/10 px-6 pt-4 pb-8 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
          <Link
            to="/products"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2.5 text-[17px] font-semibold text-slate-100 hover:text-[#EF7D01] transition-colors border-b border-slate-800/80"
          >
            Products Catalog
          </Link>
          <div className="grid grid-cols-2 gap-2.5 pl-3 pb-2 text-[13px] text-slate-400">
            <Link to="/products?category=hydraulic-pumps" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#EF7D01] py-1 font-medium">
              • Hydraulic Pumps
            </Link>
            <Link to="/products?category=hydraulic-motors" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#EF7D01] py-1 font-medium">
              • Hydraulic Motors
            </Link>
            <Link to="/products?category=hydraulic-valves" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#EF7D01] py-1 font-medium">
              • Hydraulic Valves
            </Link>
            <Link to="/products?category=cushion-pads" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#EF7D01] py-1 font-medium">
              • Cushion Pads
            </Link>
          </div>

          <Link
            to="/solutions/wood-panel"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2.5 text-[17px] font-semibold text-slate-100 hover:text-[#EF7D01] transition-colors border-b border-slate-800/80"
          >
            Wood Panel Solutions
          </Link>

          <Link
            to="/products"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2.5 text-[17px] font-semibold text-slate-100 hover:text-[#EF7D01] transition-colors border-b border-slate-800/80"
          >
            Authorized Brands
          </Link>

          <Link
            to="/about-us"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2.5 text-[17px] font-semibold text-slate-100 hover:text-[#EF7D01] transition-colors border-b border-slate-800/80"
          >
            About Us
          </Link>

          <Link
            to="/events"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2.5 text-[17px] font-semibold text-slate-100 hover:text-[#EF7D01] transition-colors border-b border-slate-800/80"
          >
            Exhibitions &amp; Expos
          </Link>

          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2.5 text-[17px] font-semibold text-slate-100 hover:text-[#EF7D01] transition-colors"
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
