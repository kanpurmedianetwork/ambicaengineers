import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowRight, 
  Cpu, 
  Flame, 
  Building2, 
  CheckCircle2, 
  Send,
  Gauge,
  Sparkles,
  Zap,
  Globe2,
  Check,
  Plus,
  Quote
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ProductCard } from '../components/catalog/ProductCard';
import { productsData } from '../../infrastructure/data/products.data';
import { brandsData } from '../../infrastructure/data/brands.data';
import { companyData } from '../../infrastructure/data/company.data';
import { useRFQ } from '../context/RFQContext';
import { ClientMarquee } from '../components/home/ClientMarquee';

export const HomePage: React.FC = () => {
  const { addItem, isInRFQ, openDrawer } = useRFQ();
  const featuredProducts = productsData.filter(p => p.isFeatured).slice(0, 6);

  // Interactive Hero Component Selector
  const [activeHeroTab, setActiveHeroTab] = useState<'pump' | 'cushion' | 'valve'>('pump');
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {
        // Autoplay may be restricted by browser policy; poster image acts as seamless fallback
      });
    }
  }, []);

  const heroShowcaseData = {
    pump: {
      id: 'prod-rexroth-a10vso',
      name: 'Rexroth A10VSO Variable Piston Pump',
      series: 'A10VSO Series 31 / 32',
      brand: 'BOSCH REXROTH',
      pressure: '350 bar Peak',
      displacement: '18 - 140 cm³/rev',
      standard: 'ISO 3019-2 / SAE Flange',
      imageUrl: '/images/products/rexroth-a10vso.webp',
      targetSlug: 'bosch-rexroth-a10vso-axial-piston-pump'
    },
    cushion: {
      id: 'prod-cushion-pad-silicon-copper',
      name: 'European Silicon & Twilled Copper Cushion Pad',
      series: 'Ambica CP-Series (220°C)',
      brand: 'AMBICA SPEC',
      pressure: 'High Hydraulic Buffer',
      displacement: '> 180 W/m·K Heat Transfer',
      standard: 'Short Cycle Press Fit',
      imageUrl: '/images/products/cushion-pad-silicon-copper.webp',
      targetSlug: 'cushion-pad-silicon-copper'
    },
    valve: {
      id: 'prod-nachi-ss-g01-valve',
      name: 'Directional High-Pressure Solenoid Valve',
      series: 'SS-G01 Wet Pin',
      brand: 'NACHI-FUJIKOSHI',
      pressure: '315 bar Nominal',
      displacement: 'Flow up to 100 L/min',
      standard: 'DIN 24340 / CETOP 03',
      imageUrl: '/images/products/nachi-ss-g01-solenoid.webp',
      targetSlug: 'nachi-ss-g01-wet-solenoid-directional-valve'
    }
  };

  const currentHeroItem = heroShowcaseData[activeHeroTab];
  const matchingHeroProduct = productsData.find(p => p.id === currentHeroItem.id) || productsData[0];
  const isHeroInCart = isInRFQ(matchingHeroProduct.id);

  return (
    <div className="space-y-20 pb-24 bg-[#F8FAFC]">
      {/* High-Contrast Executive Navy Hero Banner with Engineering Video */}
      <section className="relative bg-[#0A0F1D] text-white pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden border-b border-slate-800">
        {/* Cinematic Background Engineering Video */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            poster="/images/products/continuous-line-machinery.webp"
            className="w-full h-full object-cover object-center scale-105 opacity-65 filter contrast-120 brightness-95"
          >
            <source src="/videos/hero-engineering.webm" type="video/webm" />
          </video>
          {/* Multi-layered dark cinematic gradient overlays for pristine contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0F1D] via-[#0A0F1D]/70 via-50% to-[#0A0F1D]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1D] via-transparent via-50% to-transparent" />
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 80% 20%, rgba(239, 125, 1, 0.22), transparent 60%), radial-gradient(ellipse at 15% 85%, rgba(14, 165, 233, 0.12), transparent 50%)'
            }}
          />
          {/* Subtle industrial grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.035] pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
              backgroundSize: '44px 44px'
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            
            {/* Left Column: Headline & Direct Action */}
            <div className="lg:col-span-7 space-y-7 text-left">
              {/* Top High-Tech Live Indicator */}
              <div className="inline-flex flex-wrap items-center gap-2.5 bg-[#0A0F1D]/85 backdrop-blur-md border border-[#EF7D01]/50 px-3.5 py-1.5 rounded-full shadow-lg">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EF7D01] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#EF7D01]" />
                </span>
                <span className="text-[11px] font-mono font-bold tracking-wider text-[#EF7D01] uppercase">
                  ENGINEERING HERITAGE SINCE 1982 • NOIDA HQ
                </span>
                <span className="hidden sm:inline h-3 w-px bg-slate-700 mx-0.5" />
                <span className="text-[10px] font-mono text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  PRECISION WORKSHOP FEED
                </span>
              </div>

              {/* Main Headline */}
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] font-display uppercase">
                  PRECISION{' '}
                  <span className="text-[#EF7D01]">
                    FLUID POWER
                  </span>{' '}
                  &amp; WOOD PANEL SYSTEMS
                </h1>
                <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-2xl">
                  Authorized stockist and solutions provider for genuine hydraulic piston pumps, bent-axis motors, proportional valves, European hot press cushion pads, and continuous panel processing lines.
                </p>
              </div>

              {/* Dual Action CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button 
                  size="lg" 
                  onClick={openDrawer} 
                  icon={<Zap className="w-4 h-4" />}
                >
                  Launch RFQ BOM Builder
                </Button>

                <Link to="/products">
                  <Button size="lg" variant="secondary" className="bg-slate-800/90 hover:bg-slate-700 text-white border border-slate-700" icon={<ArrowRight className="w-4 h-4" />}>
                    Explore 350-Bar Catalog
                  </Button>
                </Link>

                <Link to="/solutions/wood-panel">
                  <Button size="lg" variant="outline-light" icon={<Flame className="w-4 h-4 text-[#EF7D01]" />}>
                    Wood Panel Solutions
                  </Button>
                </Link>
              </div>

              {/* Real-Time Telemetry Metrics Bar */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-slate-800/80">
                <div className="bg-[#0A0F1D]/80 backdrop-blur-md border border-slate-800 rounded-xl p-3 hover:border-[#EF7D01]/50 transition-colors">
                  <div className="text-xl sm:text-2xl font-extrabold text-[#EF7D01] font-mono tracking-tight">350 BAR</div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mt-0.5">Operating Pressure</div>
                </div>

                <div className="bg-[#0A0F1D]/80 backdrop-blur-md border border-slate-800 rounded-xl p-3 hover:border-white/30 transition-colors">
                  <div className="text-xl sm:text-2xl font-extrabold text-white font-mono tracking-tight">220°C</div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mt-0.5">Cushion Heat Buffer</div>
                </div>

                <div className="bg-[#0A0F1D]/80 backdrop-blur-md border border-slate-800 rounded-xl p-3 hover:border-white/30 transition-colors">
                  <div className="text-xl sm:text-2xl font-extrabold text-white font-mono tracking-tight">15,000+</div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mt-0.5">Spares In Stock</div>
                </div>

                <div className="bg-[#0A0F1D]/80 backdrop-blur-md border border-slate-800 rounded-xl p-3 hover:border-[#EF7D01]/50 transition-colors">
                  <div className="text-xl sm:text-2xl font-extrabold text-[#EF7D01] font-mono tracking-tight">42+ YRS</div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mt-0.5">Industry Trust</div>
                </div>
              </div>
            </div>

            {/* Right Column: Clean White Interactive Telemetry Showcase Card */}
            <div className="lg:col-span-5">
              <div className="bg-white/95 backdrop-blur-md text-slate-900 border border-white/30 rounded-3xl p-6 shadow-2xl shadow-black/40 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#EF7D01] via-amber-500 to-[#0A0F1D]" />
                {/* Header HUD */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#EF7D01]" />
                    <span className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">
                      Featured Engineering Spares
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    IN STOCK
                  </span>
                </div>

                {/* Tab Switcher */}
                <div className="grid grid-cols-3 gap-1.5 pt-3 pb-4">
                  <button
                    onClick={() => setActiveHeroTab('pump')}
                    className={`py-1.5 px-2 text-[11px] font-mono font-bold rounded-lg transition-all ${
                      activeHeroTab === 'pump'
                        ? 'bg-[#EF7D01] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Piston Pump
                  </button>
                  <button
                    onClick={() => setActiveHeroTab('cushion')}
                    className={`py-1.5 px-2 text-[11px] font-mono font-bold rounded-lg transition-all ${
                      activeHeroTab === 'cushion'
                        ? 'bg-[#EF7D01] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Cushion Pad
                  </button>
                  <button
                    onClick={() => setActiveHeroTab('valve')}
                    className={`py-1.5 px-2 text-[11px] font-mono font-bold rounded-lg transition-all ${
                      activeHeroTab === 'valve'
                        ? 'bg-[#EF7D01] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Solenoid Valve
                  </button>
                </div>

                {/* Product Clean Studio Stage */}
                <div className="bg-slate-50 border border-slate-100 h-64 p-4 flex items-center justify-center relative rounded-2xl mb-4 group">
                  <img
                    src={currentHeroItem.imageUrl}
                    alt={currentHeroItem.name}
                    width={400}
                    height={260}
                    decoding="async"
                    fetchPriority="high"
                    className="max-h-52 max-w-[85%] object-contain transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute top-3 left-3">
                    <Badge variant="amber" size="xs">
                      {currentHeroItem.brand}
                    </Badge>
                  </div>
                </div>

                {/* Telemetry Detail Grid */}
                <div className="space-y-3">
                  <div>
                    <div className="text-[11px] font-mono text-[#EF7D01] font-semibold uppercase">
                      {currentHeroItem.series}
                    </div>
                    <div className="text-sm font-bold text-slate-900 truncate">
                      {currentHeroItem.name}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div>
                      <span className="text-slate-400 text-[9px] block uppercase">Rating / Capacity</span>
                      <strong className="text-slate-900">{currentHeroItem.pressure}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[9px] block uppercase">Flow / Thermal</span>
                      <strong className="text-slate-900">{currentHeroItem.displacement}</strong>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-1">
                    <Button
                      size="sm"
                      variant={isHeroInCart ? 'secondary' : 'primary'}
                      onClick={() => addItem(matchingHeroProduct, 1)}
                      className="flex-1 py-2 text-xs"
                      icon={isHeroInCart ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Plus className="w-3.5 h-3.5" />}
                    >
                      {isHeroInCart ? 'Added to BOM Schedule' : 'Add to RFQ BOM'}
                    </Button>

                    <Link
                      to={`/products/${currentHeroItem.targetSlug}`}
                      className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-all text-xs flex items-center justify-center"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Live Client Logos Infinite Scroller */}
      <ClientMarquee />

      {/* Squarespace Clean Bento Grid: Core Engineering Divisions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono font-semibold text-[#EF7D01] uppercase tracking-widest flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#EF7D01]" />
              Specialized Core Divisions
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 uppercase font-display mt-1">
              Industrial Engineering Capabilities
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md">
            Delivering OEM reliability for high-tonnage multi-opening hot presses, continuous panel manufacturing lines, and automated industrial machinery.
          </p>
        </div>

        {/* 4-Card Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Bento Card 1: High Pressure Fluid Power (Span 2 on lg) */}
          <div className="lg:col-span-2 bg-white border border-slate-200/90 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:border-[#EF7D01]/50 transition-all duration-300 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#EF7D01]">
                  <Cpu className="w-6 h-6" />
                </div>
                <Badge variant="amber" size="sm">
                  400 BAR RATED
                </Badge>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-[#EF7D01] transition-colors">
                  High-Pressure Fluid Power &amp; Hydraulic Systems
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2 max-w-xl">
                  Precision axial and radial piston pumps, bent-axis variable motors, modular directional valves, and proportional manifolds engineered to sustain continuous heavy-duty industrial cycling.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">Brand Origin</span>
                  <span className="text-xs font-bold text-slate-900">Bosch Rexroth</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">Japanese Spec</span>
                  <span className="text-xs font-bold text-slate-900">Nachi Fujikoshi</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">Indian OEM</span>
                  <span className="text-xs font-bold text-slate-900">Polyhydron Belgaum</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">Fast Dispatch</span>
                  <span className="text-xs font-bold text-emerald-600">Same-Day Stock</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-slate-100">
              <Link to="/products?category=hydraulic-pumps" className="text-xs font-bold text-[#EF7D01] hover:text-[#D66D00] inline-flex items-center gap-1.5">
                Explore Hydraulic Catalog <ArrowRight className="w-4 h-4" />
              </Link>
              <span className="text-[11px] font-mono text-slate-400">DIN 24340 / CETOP Ready</span>
            </div>
          </div>

          {/* Bento Card 2: European Cushion Pads (Span 1 on lg) */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:border-[#EF7D01]/50 transition-all duration-300 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#EF7D01]">
                  <Flame className="w-6 h-6" />
                </div>
                <Badge variant="amber" size="sm" pulse>
                  FLAGSHIP TECH
                </Badge>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  European Cushion Pads &amp; Press Technology
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">
                  Twilled bunched copper wire combined with high-grade silicone elastomer. Equalizes press platens, eliminates melamine burning, and extends stainless plate life by 300%.
                </p>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1.5 text-[11px] font-mono">
                <div className="flex justify-between text-slate-600">
                  <span>Operating Temp:</span>
                  <span className="text-[#EF7D01] font-bold">Up to 220°C</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Standard Formats:</span>
                  <span className="text-slate-900">4x8, 6x9, 7x14 ft</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <Link to="/products/cushion-pad-silicon-copper" className="text-xs font-bold text-[#EF7D01] hover:text-[#D66D00] inline-flex items-center gap-1.5">
                Inspect Cushion Specs <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Bento Card 3: 24/7 Breakdown Dispatch */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:border-[#EF7D01]/50 transition-all duration-300 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <Zap className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Urgent Breakdown &amp; Same-Day Dispatch
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">
                  When a production line stalls, minutes matter. Our inventory in Delhi-NCR and Ahmedabad ships critical pumps, valves, and seal kits via express air cargo within 4 hours.
                </p>
              </div>

              <div className="text-[11px] font-mono text-slate-500 space-y-1">
                <div>• Technical Helpline: <strong>+91 7600025020</strong></div>
                <div>• Direct WhatsApp Dispatch Desk</div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <a
                href={`https://wa.me/${companyData.contact.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1.5"
              >
                Contact Breakdown Desk <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Bento Card 4: Noida Experience Centre (Span 2 on lg) */}
          <div className="lg:col-span-2 bg-white border border-slate-200/90 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:border-[#EF7D01]/50 transition-all duration-300 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
                  <Building2 className="w-6 h-6" />
                </div>
                <Badge variant="blue" size="sm">
                  NOIDA CORPORATE HQ
                </Badge>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Flagship Experience Centre &amp; Test Facility
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2 max-w-xl">
                  Located at Sovereign Corporate Tower, Sector 136, Noida. Inspect live hydraulic test benches, examine European cushion pad samples, and consult directly with senior fluid power specialists.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <strong className="text-slate-900 block font-mono text-xs">Address:</strong>
                  Floor 5, Plot A-143, Sovereign Corporate Tower, Noida, UP
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <strong className="text-slate-900 block font-mono text-xs">Consultation:</strong>
                  Walk-in engineering trials and custom sizing sessions available.
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-slate-100">
              <Link to="/contact" className="text-xs font-bold text-[#EF7D01] hover:text-[#D66D00] inline-flex items-center gap-1.5">
                Book Experience Centre Visit <ArrowRight className="w-4 h-4" />
              </Link>
              <span className="text-[11px] font-mono text-slate-400">Noida Expressway Corridor</span>
            </div>
          </div>

        </div>
      </section>

      {/* Authorized Brand Partners Showcase */}
      <section className="bg-white border-y border-slate-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-mono font-semibold text-[#EF7D01] uppercase tracking-widest flex items-center gap-1.5">
                <Globe2 className="w-4 h-4 text-[#EF7D01]" />
                Global OEM Distribution Network
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 uppercase font-display mt-1">
                Authorized Brand Partners
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md">
              We maintain direct stock and distribution partnerships with global fluid power leaders, ensuring immediate dispatch and verified authentic components.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandsData.map((brand) => (
              <Link
                key={brand.id}
                to={`/brands/${brand.id}`}
                className="bg-slate-50/80 border border-slate-200/90 hover:border-[#EF7D01]/50 rounded-2xl p-4 text-center flex flex-col items-center justify-between group transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="w-full flex flex-col items-center">
                  <span className="text-[10px] font-mono font-bold text-[#EF7D01] uppercase tracking-widest block mb-2.5 bg-orange-50/90 py-0.5 px-2 rounded-full border border-orange-200">
                    {brand.countryOfOrigin}
                  </span>
                  
                  {/* Brand Partner Visual Logo */}
                  <div className="h-16 w-full flex items-center justify-center p-2 mb-3 bg-white rounded-xl border border-slate-200/80 group-hover:border-[#EF7D01]/40 transition-all shadow-sm">
                    {brand.logoUrl ? (
                      <img
                        src={brand.logoUrl}
                        alt={`${brand.name} logo`}
                        className="max-h-10 max-w-[88%] object-contain filter contrast-105 group-hover:scale-105 transition-transform duration-200"
                        loading="lazy"
                      />
                    ) : (
                      <div className="text-xs font-bold text-slate-700">{brand.name}</div>
                    )}
                  </div>

                  <div className="text-xs font-extrabold text-slate-900 group-hover:text-[#EF7D01] transition-colors leading-snug">
                    {brand.name}
                  </div>
                </div>

                <div className="mt-3 text-[10px] font-mono text-slate-500 group-hover:text-slate-900 uppercase tracking-wider flex items-center gap-1">
                  Series Catalog <ArrowRight className="w-3 h-3 text-[#EF7D01]" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured High-Demand Industrial Spares */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono font-semibold text-[#EF7D01] uppercase tracking-widest">
              OEM Certified Catalog
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 uppercase font-display mt-1">
              Featured Industrial Spares
            </h2>
          </div>
          <Link to="/products">
            <Button variant="outline" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
              View Complete 20+ Component Catalog
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* Flagship Cushion Pad Spotlight Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-orange-50 via-white to-orange-50/50 border border-orange-200/90 p-8 sm:p-12 shadow-sm">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-[#EF7D01] px-3 py-1 rounded-full text-xs font-semibold">
              <Flame className="w-3.5 h-3.5" />
              Specialized Wood Panel Technology
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 uppercase font-display leading-tight">
              European Silicon &amp; Twilled Copper Cushion Pads
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Engineered specifically for short cycle hot presses. Buffers extreme clamping tonnages, eliminates thermal cold spots, and extends the lifespan of expensive stainless steel press plates.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link to="/products/cushion-pad-silicon-copper">
                <Button size="md" icon={<ArrowRight className="w-4 h-4" />}>
                  View Technical Specs &amp; Sizing
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="md">
                  Request Custom Cut Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Chairman & Managing Director (CMD) Leadership Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-[#0A0F1D] border-2 border-slate-800 p-8 sm:p-12 shadow-2xl overflow-hidden">
          <Quote className="w-64 h-64 text-white/[0.03] absolute -bottom-12 -right-12 pointer-events-none" />
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#EF7D01]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* CMD Portrait */}
            <div className="lg:col-span-4 flex justify-center lg:justify-start">
              <div className="relative w-56 sm:w-64 aspect-[4/5] rounded-2xl overflow-hidden border-2 border-[#EF7D01]/60 shadow-2xl bg-slate-900 group shrink-0">
                <img
                  src="/images/leadership/mohit-chhajer-md.webp"
                  alt={`${companyData.managingDirector} - Chairman & Managing Director`}
                  width={976}
                  height={994}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top filter brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1D] via-transparent to-transparent opacity-85" />
                <div className="absolute bottom-3 inset-x-3 p-2.5 rounded-xl bg-[#0A0F1D]/80 backdrop-blur-md border border-slate-700/80 text-center">
                  <div className="text-[10px] font-mono font-bold text-[#EF7D01] uppercase tracking-wider">
                    CHAIRMAN &amp; MANAGING DIRECTOR
                  </div>
                  <div className="text-xs font-bold text-white uppercase font-executive tracking-wider mt-0.5">
                    {companyData.managingDirector}
                  </div>
                </div>
              </div>
            </div>

            {/* CMD Quote & Vision */}
            <div className="lg:col-span-8 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EF7D01]/15 border border-[#EF7D01]/30 text-[#EF7D01] text-xs font-mono font-bold uppercase tracking-wider">
                <Quote className="w-3.5 h-3.5" />
                Executive Leadership Perspective
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white uppercase font-display tracking-tight leading-tight">
                "Our Success Has Always Been Driven By Quality, Reliability &amp; Customer Trust"
              </h2>

              <blockquote className="text-sm sm:text-base text-slate-200 leading-relaxed not-italic font-sans border-l-2 border-[#EF7D01] pl-4 sm:pl-5 font-normal">
                &ldquo;{companyData.mdMessage}&rdquo;
              </blockquote>

              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-lg sm:text-xl font-bold text-white uppercase font-executive tracking-wider">
                    {companyData.managingDirector}
                  </div>
                  <div className="text-xs text-[#EF7D01] font-mono font-semibold mt-0.5">
                    Chairman &amp; Managing Director • {companyData.brandName}
                  </div>
                </div>

                <div>
                  <Link
                    to="/about-us"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#EF7D01] hover:bg-[#D66D00] text-white font-bold text-sm shadow-md hover:shadow-lg hover:shadow-orange-500/25 active:scale-[0.98] transition-all group"
                  >
                    <span>Read Full Story</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Engineering & Worldwide Export Standards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-slate-200 rounded-3xl p-8 sm:p-12 bg-white space-y-8 shadow-sm">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-200 px-3 py-1 rounded-full text-xs font-semibold text-sky-700">
              International Procurement &amp; Export Standards
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 uppercase font-display">
              ENGINEERED FOR GLOBAL INDUSTRY
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Meeting stringent DIN, ISO, and SAE fluid power specifications. Trusted by multinational wood panel processors and heavy manufacturing facilities across India and worldwide export markets.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-4">
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 space-y-2.5">
              <div className="text-[#EF7D01] font-mono font-bold text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#EF7D01] animate-ping" />
                ISO 9001:2015
              </div>
              <h3 className="text-sm font-bold text-slate-900 uppercase font-mono">Certified Quality</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Full traceability, pressure bench test reports, and certificate of conformance with every component.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 space-y-2.5">
              <div className="text-sky-700 font-mono font-bold text-sm">DIN / SAE / CETOP</div>
              <h3 className="text-sm font-bold text-slate-900 uppercase font-mono">Global Standards</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Interchangeable mounting interfaces matching German, Japanese, and American machine designs.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 space-y-2.5">
              <div className="text-emerald-700 font-mono font-bold text-sm">Worldwide Export</div>
              <h3 className="text-sm font-bold text-slate-900 uppercase font-mono">Express Freight</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Air and sea freight dispatch to the Middle East, Southeast Asia, and Africa with multimodal cargo tracking.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 space-y-2.5">
              <div className="text-orange-700 font-mono font-bold text-sm">Custom RFQ &amp; BOM</div>
              <h3 className="text-sm font-bold text-slate-900 uppercase font-mono">Multi-Currency</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Fast turn-around proforma quotes in INR, USD, and EUR with direct commercial engineering consultation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
