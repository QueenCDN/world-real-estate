
export interface InfrastructureItem {
  key: string;
  available: boolean;
}

export interface Property {
  id: number;
  title: Record<string, string>;
  description: Record<string, string>;
  images: string[];
  district: 'Avsallar' | 'Alanya Center' | 'Oba' | 'Tosmur' | 'Kestel' | 'Mahmutlar' | 'Kargicak';
  price: number;
  area: number;
  rooms: '1+1' | '2+1' | '3+1' | '4+1' | '5+1';
  type: 'apartment' | 'villa' | 'house';
  seller: 'owner' | 'developer';
  distanceToSea: number;
  infrastructure: InfrastructureItem[];
}

export type Language = 'ru' | 'en' | 'tr';

export interface Translations {
  [key: string]: any; 
}

export interface FilterState {
  district: string;
  priceMin: number;
  priceMax: number;
  seller: string;
  rooms: string;
  type: string;
}

export interface ContactRequest {
  id: number;
  name: string;
  phone: string;
  email: string;
  message: string;
  propertyId?: number;
  date: string;
}
