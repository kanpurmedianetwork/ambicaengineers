import { Product, ProductCategory, BrandId } from '../entities/Product';
import { Brand } from '../entities/Brand';

export interface ProductFilterParams {
  category?: ProductCategory;
  brand?: BrandId;
  searchQuery?: string;
  minPressureBar?: number;
  maxPressureBar?: number;
  isFeatured?: boolean;
}

export interface IProductRepository {
  getAllProducts(): Promise<Product[]>;
  getProductById(id: string): Promise<Product | null>;
  getProductBySlug(slug: string): Promise<Product | null>;
  getProductsByCategory(category: ProductCategory): Promise<Product[]>;
  getProductsByBrand(brand: BrandId): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  filterProducts(params: ProductFilterParams): Promise<Product[]>;
  getAllBrands(): Promise<Brand[]>;
  getBrandById(id: BrandId): Promise<Brand | null>;
}
