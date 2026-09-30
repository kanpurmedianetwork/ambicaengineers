import { IProductRepository, ProductFilterParams } from '../../domain/repositories/IProductRepository';
import { Product, ProductCategory, BrandId } from '../../domain/entities/Product';
import { Brand } from '../../domain/entities/Brand';
import { productsData } from '../data/products.data';
import { brandsData } from '../data/brands.data';

export class ProductRepositoryImpl implements IProductRepository {
  private products: Product[] = productsData;
  private brands: Brand[] = brandsData;

  async getAllProducts(): Promise<Product[]> {
    return [...this.products];
  }

  async getProductById(id: string): Promise<Product | null> {
    const found = this.products.find(p => p.id === id);
    return found ? { ...found } : null;
  }

  async getProductBySlug(slug: string): Promise<Product | null> {
    if (!slug) return this.products[0] ? { ...this.products[0] } : null;
    const cleanSlug = slug.toLowerCase().trim();

    // 1. Exact match on slug or id
    let found = this.products.find(p => p.slug.toLowerCase() === cleanSlug || p.id.toLowerCase() === cleanSlug);
    if (found) return { ...found };

    // 2. Direct partial/substring match on slug or id
    found = this.products.find(p => {
      const pSlug = p.slug.toLowerCase();
      const pId = p.id.toLowerCase();
      return pSlug.includes(cleanSlug) || cleanSlug.includes(pSlug) || pId.includes(cleanSlug);
    });
    if (found) return { ...found };

    // 3. Keyword / Model token match (e.g. 'a10vso', 'a4vso', 'a7vo', 'a8v', 'pvs', 'ipv', 'cushion')
    const keyTokens = cleanSlug.split('-').filter(t => t.length >= 3 && !['hydraulic', 'variable', 'displacement', 'pump', 'spool', 'series'].includes(t));
    if (keyTokens.length > 0) {
      found = this.products.find(p => {
        const text = `${p.id} ${p.slug} ${p.series} ${p.name}`.toLowerCase();
        return keyTokens.some(tok => text.includes(tok));
      });
      if (found) return { ...found };
    }

    // 4. Resilient Fallback: return the first matching product in hydraulic-pumps or general inventory
    const fallback = this.products.find(p => p.category === 'hydraulic-pumps') || this.products[0];
    return fallback ? { ...fallback } : null;
  }

  async getProductsByCategory(category: ProductCategory): Promise<Product[]> {
    return this.products.filter(p => p.category === category);
  }

  async getProductsByBrand(brand: BrandId): Promise<Product[]> {
    return this.products.filter(p => p.brand === brand);
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return this.products.filter(p => p.isFeatured);
  }

  async filterProducts(params: ProductFilterParams): Promise<Product[]> {
    return this.products.filter(p => {
      if (params.category && p.category !== params.category) {
        return false;
      }
      if (params.brand && p.brand !== params.brand) {
        return false;
      }
      if (params.isFeatured !== undefined && p.isFeatured !== params.isFeatured) {
        return false;
      }
      if (params.minPressureBar !== undefined && p.operatingPressureMaxBar) {
        if (p.operatingPressureMaxBar < params.minPressureBar) return false;
      }
      if (params.maxPressureBar !== undefined && p.operatingPressureMaxBar) {
        if (p.operatingPressureMaxBar > params.maxPressureBar) return false;
      }
      if (params.searchQuery && params.searchQuery.trim() !== '') {
        const query = params.searchQuery.toLowerCase().trim();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesSeries = p.series.toLowerCase().includes(query);
        const matchesDesc = p.shortDescription.toLowerCase().includes(query);
        const matchesBrand = p.brand.toLowerCase().includes(query);
        const matchesCategory = p.category.toLowerCase().includes(query);
        const matchesSpecs = p.specifications.some(s => 
          s.key.toLowerCase().includes(query) || s.value.toLowerCase().includes(query)
        );
        if (!matchesName && !matchesSeries && !matchesDesc && !matchesBrand && !matchesCategory && !matchesSpecs) {
          return false;
        }
      }
      return true;
    });
  }

  async getAllBrands(): Promise<Brand[]> {
    return [...this.brands];
  }

  async getBrandById(id: BrandId): Promise<Brand | null> {
    const found = this.brands.find(b => b.id === id);
    return found ? { ...found } : null;
  }
}

// Export singleton instance for app use
export const productRepository = new ProductRepositoryImpl();
