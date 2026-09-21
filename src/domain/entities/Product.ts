export interface TechnicalSpecification {
  key: string;
  value: string;
  unit?: string;
}

export type ProductCategory = 
  | 'hydraulic-pumps'
  | 'hydraulic-motors'
  | 'hydraulic-valves'
  | 'wood-panel-solutions'
  | 'cushion-pads'
  | 'lubrication-systems';

export type BrandId = 
  | 'rexroth'
  | 'polyhydron'
  | 'nachi'
  | 'huade'
  | 'voith'
  | 'veljan'
  | 'ambica';

export interface Product {
  id: string;
  slug: string;
  name: string;
  series: string;
  brand: BrandId;
  category: ProductCategory;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
  diagramUrl?: string;
  keyFeatures: string[];
  specifications: TechnicalSpecification[];
  operatingPressureMaxBar?: number;
  displacementCm3Rev?: string;
  fluidCompatibility?: string[];
  applications: string[];
  pdfDatasheetUrl?: string;
  isFeatured?: boolean;
}
