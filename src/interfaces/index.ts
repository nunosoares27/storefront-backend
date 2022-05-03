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

export interface DeleteProductDTO {
  id: number;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  password: string;
}

export interface RegisterUserDTO {
  firstName: string;
  lastName: string;
  password: string;
}

export interface LoginUserDTO {
  firstName: string;
  lastName: string;
  password: string;
}

export interface DeleteUserDTO {
  id: number;
}

export interface Order {
  id: number;
  user_id: number;
  status: boolean;
}

export interface CreateOrderDTO {
  user_id: number;
  status: boolean;
}

export interface EditOrderDTO {
  user_id?: number;
  status?: boolean;
}

export interface DeleteOrderDTO {
  id: number;
}

export interface AddProductToOrderDTO {
  id: number;
  product_id: number;
  quantity: number;
}
