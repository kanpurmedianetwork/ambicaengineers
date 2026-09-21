import { Product } from './Product';

export interface RFQItem {
  product: Product;
  quantity: number;
  notes?: string;
  addedAt: string;
}

export interface RFQSubmission {
  id: string;
  customerName: string;
  companyName: string;
  email: string;
  phone: string;
  city: string;
  state?: string;
  country?: string;
  currency?: 'INR' | 'USD' | 'EUR';
  notes?: string;
  items: {
    productId: string;
    productName: string;
    series: string;
    brand: string;
    quantity: number;
    notes?: string;
  }[];
  submittedAt: string;
}
