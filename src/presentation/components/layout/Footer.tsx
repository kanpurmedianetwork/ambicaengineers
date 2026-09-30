import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Phone, Mail, MapPin, ArrowUpRight, Award } from 'lucide-react';
import { companyData } from '../../../infrastructure/data/company.data';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0A0F1D] border-t border-white/[0.08] text-slate-400 text-sm">
      {/* Top Banner: Quality Guarantee */}
      <div className="border-b border-white/[0.06] bg-black/25 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EF7D01]/10 border border-[#EF7D01]/30 flex items-center justify-center text-[#EF7D01] shrink-0 shadow-[0_0_15px_rgba(239,125,1,0.15)]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-white font-semibold text-sm">100% Certified Genuine Spares</div>
              <div className="text-xs text-slate-400">Strict Quality Assurance from European &amp; Japanese OEM Partners</div>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              ISO 9001:2015 Compliant
            </span>
            <span>•</span>
            <span>Pan-India &amp; Global Export</span>
            <span>•</span>
            <span>OEM Warranty Backed</span>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Company Profile */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center">
              <img 
                src="/images/logo.png" 
                alt="Ambica Engineers & Lubricants Pvt Ltd" 
                className="h-10 w-auto object-contain brightness-115 drop-shadow-[0_2px_10px_rgba(239,125,1,0.2)]" 
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Trusted industrial partner for high-pressure hydraulic components, wood panel processing machinery, European cushion pads, and specialty lubricants. Engineering legacy spanning over four decades.
            </p>

            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#EF7D01] shrink-0 mt-0.5" />
                <span>
                  Floor 5, Plot No. A-143, Sovereign Corporate Tower, Sector 136, Noida, Uttar Pradesh 201304, India
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#EF7D01] shrink-0" />
                <a href={`tel:${companyData.contact.primaryPhone.replace(/\s+/g, '')}`} className="hover:text-[#EF7D01] transition-colors">
                  {companyData.contact.primaryPhone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#EF7D01] shrink-0" />
                <a href={`mailto:${companyData.contact.primaryEmail}`} className="hover:text-[#EF7D01] transition-colors">
                  {companyData.contact.primaryEmail}
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Product Line */}
          <div>
            <h3 className="text-white text-xs font-semibold uppercase tracking-wider mb-4 border-l-2 border-[#EF7D01] pl-2 font-mono">
              Hydraulics Portfolio
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/products?category=hydraulic-pumps" className="hover:text-white transition-colors">
                  Axial Piston Pumps
                </Link>
              </li>
              <li>
                <Link to="/products?category=hydraulic-pumps" className="hover:text-white transition-colors">
                  Radial Piston Pumps
                </Link>
              </li>
              <li>
                <Link to="/products?category=hydraulic-motors" className="hover:text-white transition-colors">
                  Bent Axis Hydraulic Motors
                </Link>
              </li>
              <li>
                <Link to="/products?category=hydraulic-valves" className="hover:text-white transition-colors">
                  Directional Solenoid Valves
                </Link>
              </li>
              <li>
                <Link to="/products?category=hydraulic-valves" className="hover:text-white transition-colors">
                  Modular Stack Valves
                </Link>
              </li>
              <li>
                <Link to="/products?category=hydraulic-valves" className="hover:text-white transition-colors">
                  Proportional &amp; Servo Valves
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Wood Panel & Specialty */}
          <div>
            <h3 className="text-white text-xs font-semibold uppercase tracking-wider mb-4 border-l-2 border-[#EF7D01] pl-2 font-mono">
              Wood Panel &amp; Solutions
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/products?category=cushion-pads" className="hover:text-white transition-colors">
                  European Cushion Pads
                </Link>
              </li>
              <li>
                <Link to="/solutions/wood-panel" className="hover:text-white transition-colors">
                  Continuous Board Lines
                </Link>
              </li>
              <li>
                <Link to="/solutions/wood-panel" className="hover:text-white transition-colors">
                  Multi-Opening Hot Presses
                </Link>
              </li>
              <li>
                <Link to="/solutions/wood-panel" className="hover:text-white transition-colors">
                  Rotary Airlock Feeders
                </Link>
              </li>
              <li>
                <Link to="/products?category=lubrication-systems" className="hover:text-white transition-colors">
                  Brenntag Hydraulic Oils
                </Link>
              </li>
              <li>
                <Link to="/products?category=lubrication-systems" className="hover:text-white transition-colors">
                  Oil Filtration Units
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Partner Brands */}
          <div>
            <h3 className="text-white text-xs font-semibold uppercase tracking-wider mb-4 border-l-2 border-[#EF7D01] pl-2 font-mono">
              Authorized Brands
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/brands/rexroth" className="hover:text-white transition-colors flex items-center justify-between group">
                  <span>Bosch Rexroth</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-[#EF7D01] transition-colors" />
                </Link>
              </li>
              <li>
                <Link to="/brands/polyhydron" className="hover:text-white transition-colors flex items-center justify-between group">
                  <span>Polyhydron</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-[#EF7D01] transition-colors" />
                </Link>
              </li>
              <li>
                <Link to="/brands/nachi" className="hover:text-white transition-colors flex items-center justify-between group">
                  <span>Nachi (Fujikoshi)</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-[#EF7D01] transition-colors" />
                </Link>
              </li>
              <li>
                <Link to="/brands/huade" className="hover:text-white transition-colors flex items-center justify-between group">
                  <span>Huade Hydraulic</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-[#EF7D01] transition-colors" />
                </Link>
              </li>
              <li>
                <Link to="/brands/voith" className="hover:text-white transition-colors flex items-center justify-between group">
                  <span>Voith Turbo</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-[#EF7D01] transition-colors" />
                </Link>
              </li>
              <li>
                <Link to="/brands/veljan" className="hover:text-white transition-colors flex items-center justify-between group">
                  <span>Veljan / Sarva</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-[#EF7D01] transition-colors" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="text-center sm:text-left">
            © {new Date().getFullYear()} <span className="whitespace-nowrap font-medium text-slate-300">Ambica Engineers &amp; Lubricants Pvt Ltd</span>. All rights reserved. Legacy Since 1982.
          </div>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-[#EF7D01] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/contact" className="hover:text-[#EF7D01] transition-colors">
              Noida Experience Centre
            </Link>
            <Link to="/events" className="hover:text-[#EF7D01] transition-colors">
              Exhibitions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
