import { IProductRepository, ProductFilterParams } from '../../domain/repositories/IProductRepository';
import { Product, ProductCategory, BrandId } from '../../domain/entities/Product';
import { Brand } from '../../domain/entities/Brand';

export class CatalogUseCases {
  constructor(private productRepo: IProductRepository) {}

  async getAllProducts(): Promise<Product[]> {
    return this.productRepo.getAllProducts();
  }

  async getProductBySlug(slug: string): Promise<Product | null> {
    return this.productRepo.getProductBySlug(slug);
  }

  async getProductsByCategory(category: ProductCategory): Promise<Product[]> {
    return this.productRepo.getProductsByCategory(category);
  }

  async getProductsByBrand(brand: BrandId): Promise<Product[]> {
    return this.productRepo.getProductsByBrand(brand);
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return this.productRepo.getFeaturedProducts();
  }

  async filterProducts(params: ProductFilterParams): Promise<Product[]> {
    return this.productRepo.filterProducts(params);
  }

  async getAllBrands(): Promise<Brand[]> {
    return this.productRepo.getAllBrands();
  }

  async getBrandById(id: BrandId): Promise<Brand | null> {
    return this.productRepo.getBrandById(id);
  }
}
