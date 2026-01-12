export interface Category {
  id: number;
  name: string;
  description?: string;
  status: "ACTIVE" | "INACTIVE";
  imageUrl?: string;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  stockQuantity: number;
  status: "ACTIVE" | "INACTIVE" | "OUT_OF_STOCK";
  category: Category;
  imageUrl?: string;
}
