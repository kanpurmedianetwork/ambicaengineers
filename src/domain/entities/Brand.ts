import { BrandId } from './Product';

export interface Brand {
  id: BrandId;
  name: string;
  countryOfOrigin: string;
  tagline: string;
  description: string;
  logoUrl?: string;
  bannerColor: string;
  specialties: string[];
  authorizedStatus: string;
  popularSeries: string[];
}
