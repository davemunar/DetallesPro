export type PriceCategory = 'Esencial' | 'Premium' | 'VIP Pro';
export type KitType = 'Kits Empresariales' | 'Anchetas' | 'Promocionales';
export type Experience = 'Navidad y fin de año' | 'Agradecimiento y Lealtad' | 'Promoción de Tú Logo / Marca' | 'Bienvenida / Onboarding';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrls: string[];
  category: string; // Could be a more specific type if needed
  priceCategory: PriceCategory;
  kitType: KitType;
  experience: Experience;
}

export interface QuoteItem extends Product {
  quantity: number;
  wantsAdvisory: boolean;
}
