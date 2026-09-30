import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, Award, ArrowLeft, Layers, CheckCircle2 } from 'lucide-react';
import { BrandId, Product } from '../../domain/entities/Product';
import { Brand } from '../../domain/entities/Brand';
import { productRepository } from '../../infrastructure/repositories/ProductRepositoryImpl';
import { ProductCard } from '../components/catalog/ProductCard';
import { Button } from '../components/ui/Button';

export const BrandPage: React.FC = () => {
  const { brandId } = useParams<{ brandId: string }>();
  const [brand, setBrand] = useState<Brand | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!brandId) return;
    setLoading(true);

    const bId = brandId as BrandId;
    productRepository.getBrandById(bId).then((b) => {
      setBrand(b);
      if (b) {
        productRepository.getProductsByBrand(b.id).then((prods) => {
          setProducts(prods);
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });
  }, [brandId]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-[#EF7D01] font-mono animate-pulse">Loading brand portfolio...</div>
      </div>
    );
  }

  if (!brand) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Brand Not Found</h2>
        <Link to="/products">
          <Button variant="primary" size="sm">
            View All Brands
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      {/* Back link */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-slate-900 transition-colors">Brands</Link>
        <span>/</span>
        <span className="text-[#EF7D01] font-semibold">{brand.name}</span>
      </div>

      {/* Brand Hero Banner */}
      <section className="relative bg-[#0A0F1D] border border-slate-800 rounded-3xl p-8 sm:p-12 overflow-hidden space-y-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 bg-[#EF7D01]/15 border border-[#EF7D01]/30 px-3 py-1 rounded-full text-xs font-semibold text-[#EF7D01]">
                <ShieldCheck className="w-3.5 h-3.5" />
                {brand.authorizedStatus}
              </div>
              <span className="text-xs font-mono text-slate-400 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full">
                Origin: {brand.countryOfOrigin}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              {brand.logoUrl && (
                <div className="bg-white p-3 rounded-2xl border border-slate-700/60 shadow-xl shrink-0 flex items-center justify-center w-36 h-16">
                  <img
                    src={brand.logoUrl}
                    alt={`${brand.name} logo`}
                    className="max-h-11 max-w-[120px] object-contain filter contrast-105"
                  />
                </div>
              )}
              <div>
                <h1 className="text-3xl sm:text-5xl font-extrabold text-white uppercase font-mono tracking-tight">
                  {brand.name}
                </h1>
                <p className="text-[#EF7D01] font-mono text-sm font-semibold mt-1">
                  &ldquo;{brand.tagline}&rdquo;
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
              {brand.description}
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center shrink-0 min-w-[240px] space-y-2">
            <Award className="w-8 h-8 text-[#EF7D01] mx-auto" />
            <div className="text-xs font-bold text-white uppercase font-mono">100% Genuine Partner</div>
            <div className="text-[11px] text-slate-300">Factory Test Reports Included</div>
            <div className="text-[11px] text-emerald-400 font-semibold pt-1">Direct Factory Warranty</div>
          </div>
        </div>

        {/* Popular Series Tags */}
        <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 font-semibold mr-2">Featured Product Series:</span>
          {brand.popularSeries.map((s, idx) => (
            <span key={idx} className="bg-white/10 border border-white/15 text-orange-200 text-xs px-3 py-1 rounded-lg font-mono">
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* Brand Products Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 uppercase font-mono">
            {brand.name} Spares &amp; Products ({products.length})
          </h2>
          <Link to="/products" className="text-xs font-semibold text-[#EF7D01] hover:text-[#D66D00] transition-colors">
            View All Brands Catalog →
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="bg-white border border-slate-200/90 rounded-2xl p-12 text-center text-xs text-slate-500 shadow-sm">
            Additional {brand.name} spares are available upon inquiry. Contact our technical desk for part numbers and interchange specs.
          </div>
        ) : (
          <div className={`grid gap-6 ${
            products.length === 1 
              ? 'grid-cols-1 max-w-md mx-auto'
              : products.length === 2 
                ? 'grid-cols-1 sm:grid-cols-2 max-w-4xl mx-auto' 
                : products.length === 4 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' 
                  : products.length % 3 === 0 
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
          }`}>
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
