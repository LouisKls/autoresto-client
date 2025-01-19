export interface Category {
  id: string;
  label: string;
}

export interface Subcategory {
  id: string;
  label: string;
  icon: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  shared: boolean[];
}