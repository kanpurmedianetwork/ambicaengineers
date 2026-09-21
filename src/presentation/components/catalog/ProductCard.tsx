import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Check, Gauge, ArrowRight, Layers, ShieldCheck } from 'lucide-react';
import { Product } from '../../../domain/entities/Product';
import { useRFQ } from '../../context/RFQContext';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem, isInRFQ } = useRFQ();
  const inCart = isInRFQ(product.id);

  const brandColors: Record<string, 'amber' | 'blue' | 'green' | 'red' | 'slate' | 'cyan'> = {
    rexroth: 'blue',
    polyhydron: 'amber',
    nachi: 'red',
    huade: 'green',
    voith: 'cyan',
    veljan: 'slate',
    ambica: 'amber'
  };

  return (
    <div className="bg-white border border-slate-200/90 hover:border-[#EF7D01]/50 rounded-2xl overflow-hidden flex flex-col group transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1">
      {/* Product Image Stage (Clean Studio Surface) */}
      <div className="relative bg-slate-50/60 p-6 flex items-center justify-center h-56 border-b border-slate-100 overflow-hidden group-hover:bg-slate-50 transition-colors">
        {/* Brand Tag Top Left */}
        <div className="absolute top-3 left-3 z-10">
          <Badge variant={brandColors[product.brand] || 'amber'} size="xs">
            {product.brand.toUpperCase()}
          </Badge>
        </div>

        {/* Featured Tag Top Right */}
        <div className="absolute top-3 right-3 z-10">
          {product.isFeatured ? (
            <span className="bg-[#EF7D01] text-white text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-xs">
              FEATURED
            </span>
          ) : (
            <span className="bg-white text-slate-500 border border-slate-200 text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded">
              OEM SPEC
            </span>
          )}
        </div>

        {/* Product Image Stage */}
        <div className="w-full h-full flex items-center justify-center p-2">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="max-h-40 max-w-[85%] object-contain transition-transform duration-500 group-hover:scale-105 filter drop-shadow-sm"
            onError={(e) => {
              e.currentTarget.src = '/images/logo.png';
            }}
          />
        </div>

        {/* Bottom standard strip */}
        <div className="absolute bottom-2 inset-x-3 flex items-center justify-between text-[9px] font-mono text-slate-400 z-10 px-1 pointer-events-none">
          <span className="flex items-center gap-1 text-slate-500">
            <ShieldCheck className="w-3 h-3 text-[#EF7D01]" />
            100% Tested
          </span>
          <span>ISO 9001</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-[#EF7D01] font-semibold tracking-wider uppercase">
              {product.series}
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              {product.category.replace(/-/g, ' ').toUpperCase()}
            </span>
          </div>

          <Link to={`/products/${product.slug}`} className="block">
            <h3 className="text-base font-bold text-slate-900 group-hover:text-[#EF7D01] transition-colors line-clamp-2 leading-snug">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Technical Specs Strip */}
        <div className="grid grid-cols-2 gap-2 py-2 px-3 bg-slate-50 border border-slate-100 rounded-xl text-[11px] font-mono">
          <div className="flex items-center gap-1.5 text-slate-600">
            <Gauge className="w-3.5 h-3.5 text-[#EF7D01] shrink-0" />
            <div className="truncate">
              <span className="text-slate-400 text-[9px] block uppercase">Max Pressure</span>
              <strong className="text-slate-900">{product.operatingPressureMaxBar ? `${product.operatingPressureMaxBar} bar` : 'High Press.'}</strong>
            </div>
          </div>
          
          <div className="flex items-center gap-1.5 text-slate-600 border-l border-slate-200 pl-2">
            <Layers className="w-3.5 h-3.5 text-sky-600 shrink-0" />
            <div className="truncate">
              <span className="text-slate-400 text-[9px] block uppercase">Displacement</span>
              <strong className="text-slate-900 truncate block">{product.displacementCm3Rev ? product.displacementCm3Rev.split(' ')[0] : 'Standard'}</strong>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-1 flex items-center gap-2">
          <Button
            size="sm"
            variant={inCart ? 'secondary' : 'primary'}
            onClick={() => addItem(product, 1)}
            className="flex-1 text-xs py-2"
            icon={inCart ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Plus className="w-3.5 h-3.5" />}
          >
            {inCart ? 'In RFQ BOM' : 'Add to RFQ'}
          </Button>

          <Link
            to={`/products/${product.slug}`}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors flex items-center justify-center shrink-0"
            title="View Technical Specs"
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
