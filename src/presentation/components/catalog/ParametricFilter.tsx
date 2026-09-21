import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { ProductCategory, BrandId } from '../../../domain/entities/Product';

interface ParametricFilterProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory?: ProductCategory;
  onCategoryChange: (cat?: ProductCategory) => void;
  selectedBrand?: BrandId;
  onBrandChange: (brand?: BrandId) => void;
  onReset: () => void;
}

export const ParametricFilter: React.FC<ParametricFilterProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedBrand,
  onBrandChange,
  onReset,
}) => {
  const categories: { id: ProductCategory; label: string }[] = [
    { id: 'hydraulic-pumps', label: 'Hydraulic Pumps' },
    { id: 'hydraulic-motors', label: 'Hydraulic Motors' },
    { id: 'hydraulic-valves', label: 'Hydraulic Valves' },
    { id: 'cushion-pads', label: 'Cushion Pads' },
    { id: 'wood-panel-solutions', label: 'Wood Panel Solutions' },
    { id: 'lubrication-systems', label: 'Lubrication & Filtration' },
  ];

  const brands: { id: BrandId; label: string }[] = [
    { id: 'rexroth', label: 'Bosch Rexroth' },
    { id: 'polyhydron', label: 'Polyhydron' },
    { id: 'nachi', label: 'Nachi Fujikoshi' },
    { id: 'huade', label: 'Huade Hydraulic' },
    { id: 'voith', label: 'Voith Turbo' },
    { id: 'veljan', label: 'Veljan / Sarva' },
    { id: 'ambica', label: 'Ambica European Spec' },
  ];

  const hasActiveFilters = searchQuery !== '' || !!selectedCategory || !!selectedBrand;

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-6 space-y-6 shadow-sm">
      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by part number, series (e.g. A10VSO, A4VSO, 1R3, G01) or keyword..."
          className="w-full bg-slate-50 border border-slate-200 focus:border-[#EF7D01] focus:bg-white rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-[#EF7D01]" />
            Product Categories
          </span>
          {selectedCategory && (
            <button
              onClick={() => onCategoryChange(undefined)}
              className="text-[#EF7D01] hover:text-[#D66D00] text-[11px]"
            >
              Clear Category
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(selectedCategory === cat.id ? undefined : cat.id)}
              className={`text-xs px-3.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#EF7D01] text-white font-bold border-[#EF7D01] shadow-xs'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Brand Filters */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider">
          <span>Manufacturer Brands</span>
          {selectedBrand && (
            <button
              onClick={() => onBrandChange(undefined)}
              className="text-[#EF7D01] hover:text-[#D66D00] text-[11px]"
            >
              Clear Brand
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {brands.map((b) => (
            <button
              key={b.id}
              onClick={() => onBrandChange(selectedBrand === b.id ? undefined : b.id)}
              className={`text-xs px-3.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                selectedBrand === b.id
                  ? 'bg-[#0A0F1D] text-white font-bold border-[#0A0F1D] shadow-xs'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-100'
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      {/* Clear All active filters */}
      {hasActiveFilters && (
        <div className="pt-3 border-t border-slate-100 flex justify-end">
          <button
            onClick={onReset}
            className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer font-medium"
          >
            <X className="w-3.5 h-3.5" />
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};
