export interface Category {
  id: number;
  name: string;
}

export interface CreateCategoryDTO {
  name: string;
}

export interface EditCategoryDTO {
  id: number;
  name: string;
}

export interface DeleteCategoryDTO {
  id: number;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  category_id?: number;
}

export interface CreateProductDTO {
  name: string;
  price: number;
  category_id?: number;
}

export interface EditProductDTO {
  id: number;
  name?: string;
  price?: number;
  category_id?: number;
}
