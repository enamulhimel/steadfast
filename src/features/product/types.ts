export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  images: string[];
  colors: string[];
  sizes: string[];
  specifications: Record<string, string>;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}