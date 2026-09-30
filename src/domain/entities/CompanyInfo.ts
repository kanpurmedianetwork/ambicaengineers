export interface ExhibitionEvent {
  id: string;
  title: string;
  edition: string;
  year: number;
  dates: string;
  venue: string;
  city: string;
  stallNumber?: string;
  hallNumber?: string;
  highlightProducts: string[];
  description: string;
  badgeText: string;
  images?: string[];
}

export interface Milestone {
  year: number | string;
  title: string;
  description: string;
}

export interface CompanyInfo {
  legalName: string;
  brandName: string;
  foundedYear: number;
  legacyYear: number;
  tagline: string;
  managingDirector: string;
  mdMessage: string;
  qualityPolicy: string;
  headquarters: {
    address: string;
    building: string;
    plot: string;
    sector: string;
    city: string;
    state: string;
    country: string;
    floor: string;
    googleMapsUrl?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  contact: {
    primaryPhone: string;
    primaryEmail: string;
    website: string;
    whatsappNumber: string;
  };
  keyStats: {
    yearsOfLegacy: number;
    satisfiedClients: string;
    productsDelivered: string;
    activeSites: string;
  };
}
