import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Check, 
  Plus, 
  ShieldCheck, 
  Activity, 
  Gauge, 
  Layers, 
  Send,
} from 'lucide-react';
import { Product } from '../../domain/entities/Product';
import { productRepository } from '../../infrastructure/repositories/ProductRepositoryImpl';
import { useRFQ } from '../context/RFQContext';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ProductCard } from '../components/catalog/ProductCard';
import { companyData } from '../../infrastructure/data/company.data';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addItem, isInRFQ } = useRFQ();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [specNote, setSpecNote] = useState('');
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!slug) return;
    setLoading(true);
    productRepository.getProductBySlug(slug).then((p) => {
      setProduct(p);
      setLoading(false);
      if (p) {
        productRepository.getProductsByCategory(p.category).then(async (related) => {
          let prods = related.filter((r) => r.id !== p.id);
          if (prods.length < 3) {
            const all = await productRepository.getAllProducts();
            const supplements = all.filter((item) => item.id !== p.id && !prods.some(r => r.id === item.id));
            prods = [...prods, ...supplements];
          }
          setRelatedProducts(prods.slice(0, 3));
        });
      }
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-[#EF7D01] font-mono animate-pulse">Loading component specifications...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4 bg-[#F8FAFC]">
        <h2 className="text-2xl font-bold text-slate-900">Component Specification Not Found</h2>
        <p className="text-xs text-slate-500">
          The requested product may have been moved or updated in our catalog.
        </p>
        <Link to="/products">
          <Button variant="primary" size="sm">
            Back to Product Catalog
          </Button>
        </Link>
      </div>
    );
  }

  const inCart = isInRFQ(product.id);

  const handleAddToRFQ = () => {
    addItem(product, quantity, specNote);
  };

  const handleDirectWhatsApp = () => {
    const text = `Hello Ambica Engineers, I am interested in technical specs and pricing for: ${product.name} (${product.series}, Brand: ${product.brand.toUpperCase()}). Please share availability.`;
    window.open(`https://wa.me/${companyData.contact.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="space-y-10 pb-24 bg-[#F8FAFC]">
      {/* Dark Breadcrumb Banner for Transparent Nav */}
      <section className="relative bg-[#0A0F1D] text-white border-b border-slate-800 pt-32 pb-7 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Ambient Top Glow & Engineering Precision Grid for Transparent Nav */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[1100px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(239,125,1,0.22),transparent_70%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_20%,#000_60%,transparent_100%)] opacity-80" />
        </div>

        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-slate-400 relative z-10">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Catalog
          </button>

          <div className="flex items-center gap-2">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-white transition-colors">Products</Link>
            <span>/</span>
            <span className="text-[#EF7D01] truncate max-w-xs font-semibold">{product.name}</span>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

      {/* Main Product Hero / Spec Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Col: High-Res Image on Clean White Stage */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative bg-white border border-slate-200/90 rounded-3xl p-8 flex items-center justify-center min-h-[390px] shadow-sm">
            <img
              src={product.imageUrl}
              alt={product.name}
              width={500}
              height={500}
              decoding="async"
              fetchPriority="high"
              className="max-h-72 w-auto object-contain transition-transform duration-500 hover:scale-105 filter drop-shadow-sm"
              onError={(e) => {
                e.currentTarget.src = '/images/logo.png';
              }}
            />
            <div className="absolute top-4 left-4 z-10">
              <Badge variant="amber" size="md">
                {product.brand.toUpperCase()}
              </Badge>
            </div>
            <div className="absolute bottom-3 right-4 z-10 text-[10px] font-mono text-slate-400">
              SPEC NO. {product.id.toUpperCase()}
            </div>
          </div>

          {/* Guarantee Badges */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-white border border-slate-200/80 rounded-xl p-3 flex items-center gap-2.5 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-slate-700 font-medium">100% Genuine OEM Part</span>
            </div>
            <div className="bg-white border border-slate-200/80 rounded-xl p-3 flex items-center gap-2.5 shadow-xs">
              <Activity className="w-4 h-4 text-[#EF7D01] shrink-0" />
              <span className="text-slate-700 font-medium">Factory Pressure Tested</span>
            </div>
          </div>
        </div>

        {/* Right Col: Details, RFQ Builder & Key Specs */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <div className="text-xs font-mono font-bold text-[#EF7D01] tracking-wider uppercase">
              {product.series} • {product.category.replace('-', ' ').toUpperCase()}
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-display uppercase tracking-tight leading-tight">
              {product.name}
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed pt-2">
              {product.shortDescription}
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm">
            {product.operatingPressureMaxBar && (
              <div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Gauge className="w-3 h-3 text-[#EF7D01]" />
                  Max Pressure
                </div>
                <div className="text-lg font-mono font-extrabold text-slate-900 mt-0.5">
                  {product.operatingPressureMaxBar} bar
                </div>
              </div>
            )}
            {product.displacementCm3Rev && (
              <div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Layers className="w-3 h-3 text-sky-600" />
                  Displacement
                </div>
                <div className="text-sm font-mono font-extrabold text-slate-900 mt-0.5 truncate">
                  {product.displacementCm3Rev}
                </div>
              </div>
            )}
            <div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">
                Availability
              </div>
              <div className="text-sm font-mono font-bold text-emerald-600 mt-0.5">
                Ready Stock / Express Dispatch
              </div>
            </div>
          </div>

          {/* RFQ Order Box */}
          <div className="p-6 space-y-4 border border-slate-200/90 bg-white rounded-2xl shadow-sm">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Add to Request for Quotation (BOM)
              </div>
              <span className="text-[11px] text-slate-400 font-mono">BOM Qty Selection</span>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-slate-600 hover:text-slate-950 font-mono font-bold"
                >
                  -
                </button>
                <span className="px-3 py-1.5 text-sm font-mono font-bold text-[#EF7D01]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 text-slate-600 hover:text-slate-950 font-mono font-bold"
                >
                  +
                </button>
              </div>

              <input
                type="text"
                value={specNote}
                onChange={(e) => setSpecNote(e.target.value)}
                placeholder="Optional: specify voltage, shaft key, or custom size..."
                className="flex-1 min-w-[200px] bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#EF7D01]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <Button
                variant={inCart ? 'secondary' : 'primary'}
                onClick={handleAddToRFQ}
                className="w-full py-3 text-xs"
                icon={inCart ? <Check className="w-4 h-4 text-emerald-400" /> : <Plus className="w-4 h-4" />}
              >
                {inCart ? 'Update in RFQ Schedule' : 'Add Component to RFQ'}
              </Button>

              <Button
                variant="outline"
                onClick={handleDirectWhatsApp}
                className="w-full py-3 text-emerald-600 border-emerald-300 hover:bg-emerald-50 text-xs"
                icon={<Send className="w-4 h-4 text-emerald-600" />}
              >
                Direct WhatsApp Quote
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Specifications Table */}
      <section className="space-y-6 pt-6">
        <h2 className="text-2xl font-bold text-slate-900 uppercase font-display border-l-4 border-[#EF7D01] pl-3">
          Engineering Specifications
        </h2>

        <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs border-collapse spec-table">
            <thead>
              <tr className="bg-slate-50 text-[#EF7D01] uppercase tracking-wider font-mono">
                <th className="w-1/3">Technical Parameter</th>
                <th className="w-2/3">Engineered Value / Specification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {product.specifications.map((spec, index) => (
                <tr key={index} className="hover:bg-orange-50/40 transition-colors">
                  <td className="font-semibold text-slate-700">{spec.key}</td>
                  <td className="text-slate-900 font-mono font-medium">
                    {spec.value} {spec.unit && <span className="text-slate-500 font-normal">{spec.unit}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Deep Engineering Description & Key Features */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-8 space-y-4 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 uppercase font-display">
            Detailed Engineering Overview
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {product.fullDescription}
          </p>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-8 space-y-4 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 uppercase font-display">
            Key Performance Features
          </h3>
          <ul className="space-y-2.5 text-xs text-slate-700">
            {product.keyFeatures.map((feat, index) => (
              <li key={index} className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#EF7D01] shrink-0 mt-0.5" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Industrial Applications */}
      <section className="bg-white border border-slate-200/90 rounded-2xl p-8 space-y-4 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 uppercase font-display">
          Target Industrial Applications
        </h3>
        <div className="flex flex-wrap gap-2">
          {product.applications.map((app, index) => (
            <span
              key={index}
              className="bg-slate-50 border border-slate-200 text-slate-700 text-xs px-3 py-1.5 rounded-lg"
            >
              • {app}
            </span>
          ))}
        </div>
      </section>

      {/* Related Components */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6 pt-6">
          <h2 className="text-xl font-bold text-slate-900 uppercase font-display">
            Related Components in this Category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}
      </div>
    </div>
  );
};
