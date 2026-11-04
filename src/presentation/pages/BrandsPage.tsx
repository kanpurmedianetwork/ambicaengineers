import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, CheckCircle2, Globe2, Sparkles, Building2 } from 'lucide-react';
import { brandsData } from '../../infrastructure/data/brands.data';
import { SEOHead } from '../components/common/SEOHead';
import { FAQSection } from '../components/common/FAQSection';
import { homeFAQs } from '../../infrastructure/data/faq.data';
import { Button } from '../components/ui/Button';

export const BrandsPage: React.FC = () => {
  return (
    <div className="space-y-16 pb-24 bg-[#F8FAFC]">
      <SEOHead 
        title="Hydraulic Brand Partners & Stockist | Ambica Engineers"
        description="Genuine hydraulic brands stocked by Ambica Engineers: Bosch Rexroth, Polyhydron, Nachi, Huade, Voith, and Veljan with rapid nationwide dispatch in India."
        canonicalPath="/brands"
        image="https://www.ambicaengineers.in/images/og-image.jpg"
      />

      {/* Hero Header */}
      <section className="relative bg-[#0A0F1D] text-white border-b border-slate-800 pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden shadow-xl">
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[1100px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(239,125,1,0.22),transparent_70%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_20%,#000_60%,transparent_100%)] opacity-80" />
        </div>

        <div className="max-w-7xl mx-auto space-y-6 relative z-10">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#EF7D01] font-semibold">Brands</span>
          </div>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#EF7D01]/15 border border-[#EF7D01]/30 px-3 py-1 rounded-full text-xs font-semibold text-[#EF7D01]">
              <Globe2 className="w-3.5 h-3.5" />
              Direct Stockist &amp; Sourcing Network
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-display uppercase tracking-tight text-white leading-tight">
              AUTHORIZED &amp; CERTIFIED BRAND PARTNERS
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Ambica Engineers &amp; Lubricants Ltd maintains direct stock and distribution partnerships with global fluid power leaders. We ensure 100% authentic components, verified test certificates, and same-day dispatch from our central warehousing hubs across India.
            </p>
          </div>
        </div>
      </section>

      {/* Brands Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {brandsData.map((brand) => (
            <div 
              key={brand.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:border-[#EF7D01]/40"
            >
              <div className="p-7 space-y-6">
                {/* Brand Header & Logo Container */}
                <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-5">
                  <div className="h-16 w-36 flex items-center justify-start">
                    <img 
                      src={brand.logoUrl} 
                      alt={`${brand.name} Logo - Ambica Engineers Stockist`} 
                      className="max-h-14 max-w-full object-contain filter group-hover:scale-105 transition-transform duration-200"
                      onError={(e) => {
                        // Fallback text if image missing
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                  <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 shrink-0">
                    {brand.countryOfOrigin}
                  </span>
                </div>

                {/* Brand Name & Tagline */}
                <div className="space-y-1.5">
                  <div className="text-[11px] font-mono font-bold text-[#EF7D01] uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#EF7D01]" />
                    {brand.authorizedStatus}
                  </div>
                  <h2 className="text-xl font-bold font-display text-slate-900 group-hover:text-[#EF7D01] transition-colors">
                    {brand.name}
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    {brand.tagline}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {brand.description}
                </p>

                {/* Specialties */}
                <div className="space-y-2 pt-1">
                  <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                    Core Specialties
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {brand.specialties.map((spec, i) => (
                      <span 
                        key={i}
                        className="text-[11px] bg-slate-50 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200/80 font-medium"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Popular Series */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                    Popular Series In Stock
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1">
                    {brand.popularSeries.map((s, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#EF7D01] shrink-0" />
                        <span className="font-mono text-[11px] text-slate-800">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Link Footer */}
              <div className="p-5 bg-slate-50 border-t border-slate-100">
                <Link to={`/brands/${brand.id}`} className="block">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-between group-hover:bg-[#EF7D01] group-hover:text-white group-hover:border-[#EF7D01] transition-all text-xs"
                    icon={<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                  >
                    Explore {brand.name} Catalog
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Brand Stockist & Sourcing FAQ Section */}
      <FAQSection 
        faqs={homeFAQs.slice(0, 5)}
        title="OEM Brand Sourcing &amp; Procurement FAQ"
        subtitle="Common questions regarding authentic sourcing, manufacturer test reports, lead times, and warranty coverage across our brand portfolio."
        badge="Brand Procurement FAQ"
        className="pt-2"
      />

      {/* Sourcing Assurance CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-[#0B1528] to-slate-900 border border-slate-800 p-8 sm:p-12 text-white shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 bg-[#EF7D01]/20 border border-[#EF7D01]/30 text-[#EF7D01] px-3 py-1 rounded-full text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              Guaranteed Authentic Fluid Power
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold uppercase font-display tracking-tight text-white">
              NEED IMMEDIATE TECHNICAL SIZING OR HARD-TO-FIND PUMP CODES?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Our engineering desk cross-references OEM part numbers across Rexroth, Nachi, Polyhydron, Voith, Huade, and Veljan. We maintain central stock in Delhi-NCR and Ahmedabad for rapid factory dispatch.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link to="/contact">
              <Button size="md" icon={<ArrowRight className="w-4 h-4" />}>
                Contact Engineering Desk
              </Button>
            </Link>
            <Link to="/products">
              <Button variant="outline" size="md" className="border-slate-700 text-white hover:bg-slate-800">
                Browse Complete Catalog
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
export default BrandsPage;
