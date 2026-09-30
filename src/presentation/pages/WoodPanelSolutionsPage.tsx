import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, Layers, ArrowRight, CheckCircle2, Cpu, Wrench } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ProductCard } from '../components/catalog/ProductCard';
import { productsData } from '../../infrastructure/data/products.data';

export const WoodPanelSolutionsPage: React.FC = () => {
  const woodProducts = productsData.filter(
    (p) => p.category === 'wood-panel-solutions' || p.category === 'cushion-pads'
  );

  return (
    <div className="space-y-16 pb-24 bg-[#F8FAFC]">
      {/* Header Banner */}
      <section className="bg-[#0A0F1D] text-white border-b border-slate-800 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-orange-950/60 border border-[#EF7D01]/50 px-3.5 py-1 rounded-full text-xs font-mono font-semibold text-[#EF7D01]">
            <Flame className="w-3.5 h-3.5" />
            SPECIALIZED ENGINEERING DIVISION
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white uppercase font-display tracking-tight">
            WOOD PANEL &amp; MDF MANUFACTURING SOLUTIONS
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Turnkey engineering, high-temperature thermal cushion pads, multi-opening press components, and continuous production line spares for India&apos;s leading wood panel plants.
          </p>
        </div>
      </section>

      {/* Flagship Cushion Pad Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-sm">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-orange-50 text-[#EF7D01] border border-orange-200 px-3 py-1 rounded-full text-xs font-mono font-bold">
              European Grade Cushion Technology
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-display uppercase">
              Silicon &amp; Twilled Bunched Copper Cushion Pads
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Positioned between the hot platen and the press plate in short cycle hot press machines, Ambica European Cushion Pads buffer extreme hydraulic pressure variations, equalize heat across the entire board surface, and eliminate cold-spot bonding failures.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 pt-2">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#EF7D01] shrink-0 mt-0.5" />
                <span>Twilled copper weave provides superior thermal transfer (&gt;180 W/m·K)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#EF7D01] shrink-0 mt-0.5" />
                <span>High-rebound silicone elastomer prevents press plate indentation</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#EF7D01] shrink-0 mt-0.5" />
                <span>Withstands continuous cycle temperatures up to 220°C</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#EF7D01] shrink-0 mt-0.5" />
                <span>Custom cut to size for 4x8, 6x9, 7x14 ft press formats</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <Link to="/products/cushion-pad-silicon-copper">
                <Button size="md" icon={<ArrowRight className="w-4 h-4" />}>
                  View Technical Specifications
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center space-y-4">
            <div className="relative h-48 rounded-xl overflow-hidden border border-slate-200 shadow-sm group">
              <img
                src="/images/products/cushion-pad-detail.webp"
                alt="European Silicon & Twilled Copper Cushion Pad Microstructure"
                width={600}
                height={350}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              <span className="absolute bottom-2 left-2 text-[10px] font-mono font-semibold bg-[#EF7D01] text-white px-2 py-0.5 rounded shadow-xs">
                Twilled Copper &amp; Silicone Elastic Core
              </span>
            </div>
            <div className="text-xs font-mono text-[#EF7D01] font-bold uppercase tracking-wider">
              Short Cycle Hot Press Placement Stack
            </div>
            <div className="space-y-2 text-xs text-left bg-white p-4 rounded-xl border border-slate-200">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">1. Top Hot Platen</span>
                <span className="text-slate-900 font-mono font-bold">Heat Source</span>
              </div>
              <div className="flex justify-between py-1 border-b border-orange-200 bg-orange-50 px-2 rounded">
                <span className="text-slate-900 font-bold">2. Ambica Cushion Pad</span>
                <span className="text-[#EF7D01] font-mono font-bold">Buffer &amp; Conduction</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">3. Stainless Press Plate</span>
                <span className="text-slate-700 font-mono">Texture Matrix</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">4. Particle / MDF Board</span>
                <span className="text-emerald-700 font-mono font-semibold">Product Board</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">5. Bottom Press Plate</span>
                <span className="text-slate-700 font-mono">Texture Matrix</span>
              </div>
              <div className="flex justify-between py-1 bg-orange-50 px-2 rounded border border-orange-200">
                <span className="text-slate-900 font-bold">6. Ambica Cushion Pad</span>
                <span className="text-[#EF7D01] font-mono font-bold">Buffer &amp; Conduction</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">7. Bottom Hot Platen</span>
                <span className="text-slate-900 font-mono font-bold">Heat Source</span>
              </div>
            </div>
            <div className="text-[11px] text-slate-500 italic">
              Extends press plate life by over 300% while preventing melamine paper surface burning.
            </div>
          </div>
        </div>
      </section>

      {/* Wood Panel Machinery Catalog */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2">
          <div className="text-xs font-semibold text-[#EF7D01] uppercase tracking-widest">
            Specialized Equipment Catalog
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 uppercase font-display">
            Wood Panel Production Line Systems &amp; Spares
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {woodProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Callout: Engineering Services for Panel Plants */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 shadow-sm">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#EF7D01] flex items-center justify-center">
              <Wrench className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 uppercase font-display">Press Modernization</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Upgrading existing multi-opening and single daylight presses with proportional hydraulic leveling, rapid-closing accumulator circuits, and upgraded heating platens.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 uppercase font-display">Continuous Line Spares</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Forming station scalpers, high-precision thickness gauge sensors, conveyor belt tracking hydraulics, and high-temperature rotary joint seals for heated drums.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 uppercase font-display">Hydraulic Audits</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              On-site fluid contamination testing, valve block overhaul, accumulator nitrogen re-charging, and pump flow testing to reduce cycle times by up to 25%.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
