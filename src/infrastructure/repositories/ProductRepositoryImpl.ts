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
    const found = this.products.find(p => p.slug === slug);
    return found ? { ...found } : null;
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
