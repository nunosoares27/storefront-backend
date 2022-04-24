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
