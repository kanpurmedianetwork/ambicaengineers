import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Package, Search, SlidersHorizontal } from 'lucide-react';
import { Product, ProductCategory, BrandId } from '../../domain/entities/Product';
import { productRepository } from '../../infrastructure/repositories/ProductRepositoryImpl';
import { ProductCard } from '../components/catalog/ProductCard';
import { ParametricFilter } from '../components/catalog/ParametricFilter';

export const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | undefined>(
    (searchParams.get('category') as ProductCategory) || undefined
  );
  const [selectedBrand, setSelectedBrand] = useState<BrandId | undefined>(
    (searchParams.get('brand') as BrandId) || undefined
  );

  // Sync state with URL params
  useEffect(() => {
    const cat = searchParams.get('category') as ProductCategory;
    const brand = searchParams.get('brand') as BrandId;
    if (cat) setSelectedCategory(cat);
    if (brand) setSelectedBrand(brand);
  }, [searchParams]);

  const handleCategoryChange = (cat?: ProductCategory) => {
    setSelectedCategory(cat);
    if (cat) {
      searchParams.set('category', cat);
    } else {
      searchParams.delete('category');
    }
    setSearchParams(searchParams);
  };

  const handleBrandChange = (brand?: BrandId) => {
    setSelectedBrand(brand);
    if (brand) {
      searchParams.set('brand', brand);
    } else {
      searchParams.delete('brand');
    }
    setSearchParams(searchParams);
  };

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory(undefined);
    setSelectedBrand(undefined);
    setSearchParams({});
  };

  // Products filtering using clean repository filter method
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    productRepository.getAllProducts().then(setAllProducts);
  }, []);

  const filteredProducts = useMemo(() => {
    return allProducts.filter((p) => {
      if (selectedCategory && p.category !== selectedCategory) return false;
      if (selectedBrand && p.brand !== selectedBrand) return false;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesSeries = p.series.toLowerCase().includes(q);
        const matchesDesc = p.shortDescription.toLowerCase().includes(q);
        const matchesBrand = p.brand.toLowerCase().includes(q);
        const matchesSpecs = p.specifications.some(
          (s) => s.key.toLowerCase().includes(q) || s.value.toLowerCase().includes(q)
        );
        if (!matchesName && !matchesSeries && !matchesDesc && !matchesBrand && !matchesSpecs) {
          return false;
        }
      }
      return true;
    });
  }, [allProducts, selectedCategory, selectedBrand, searchQuery]);

  return (
    <div className="space-y-12 pb-20">
      {/* Header Banner */}
      <section className="bg-[#0A0F1D] text-white border-b border-slate-800 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="text-xs font-mono font-semibold text-[#EF7D01] uppercase tracking-widest flex items-center gap-2">
            <Package className="w-4 h-4" />
            COMPONENT &amp; MACHINERY CATALOG
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white uppercase font-display tracking-tight">
            INDUSTRIAL HYDRAULICS &amp; SPARES
          </h1>
          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            Search genuine axial and radial piston pumps, bent-axis hydraulic motors, directional valves, European cushion pads, and continuous board machinery.
          </p>
        </div>
      </section>

      {/* Catalog Main Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Filter Controls */}
        <ParametricFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          selectedBrand={selectedBrand}
          onBrandChange={handleBrandChange}
          onReset={handleReset}
        />

        {/* Results Header */}
        <div className="flex items-center justify-between text-xs text-slate-600 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#EF7D01]" />
            <span>
              Showing <strong className="text-slate-900 font-mono">{filteredProducts.length}</strong> matching component{filteredProducts.length === 1 ? '' : 's'}
            </span>
          </div>
          {(selectedCategory || selectedBrand || searchQuery) && (
            <button
              onClick={handleReset}
              className="text-[#EF7D01] hover:text-[#D66D00] font-semibold cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white border border-slate-200/90 rounded-2xl p-16 text-center space-y-4 shadow-sm">
            <Search className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-lg font-bold text-slate-900">No components matched your search parameters</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Try modifying your search term or clearing category and brand filters. You can also contact our engineering desk directly for non-catalog custom spares.
            </p>
            <button
              onClick={handleReset}
              className="mt-2 text-xs bg-[#EF7D01] hover:bg-[#D66D00] text-white font-bold px-4 py-2.5 rounded-xl cursor-pointer shadow-xs"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
