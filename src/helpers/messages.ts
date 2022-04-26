export const categoryMessages = {
  editWithSuccess: 'Category edited with success',
  deletedWithSuccess: 'Category deleted with success',
  deleteCategoryFail: (error: string): string => `Cannot delete Category =(, ${error} )`,
  editCategoryFail: (error: string): string => `Cannot edit Category =(, ${error} )`,
  theresNoCategoryWithId: (id: string): string => `Theres no category by id ${id}`,
  createCategoryFail: (error: string): string => `Cannot create Category =(, ${error} )`,
  getCategoriesFail: (error: string): string => `Cannot get categories =(, ${error} )`,
  getCategoryFail: (error: string): string => `Cannot get category =(, ${error} )`,
};

export const productMessages = {
  createProductFail: (error: string): string => `Cannot create Product =(, ${error} )`,
  getProductsFail: (error: string): string => `Cannot get products =(, ${error} )`,
  theresNoProductWithId: (id: string): string => `Theres no product by id ${id}`,
  getProductFail: (error: string): string => `Cannot get product =(, ${error} )`,
  editWithSuccess: 'Product edited with success',
  deletedWithSuccess: 'Product deleted with success',
  deleteProductFail: (error: string): string => `Cannot delete Product =(, ${error} )`,
  editProductFail: (error: string): string => `Cannot edit Product =(, ${error} )`,
  provideAtLeastOneParam: 'Provide at least one param on body',
};

export const userMessages = {
  missingFields: 'Missing fields! Please make sure you provide firstName, lastName and password!',
  registerUserFail: (error: string): string => `Could not add new user =(. ${error}`,
  registerUserFailGeneric: 'Failed to create user',
  invalidToken: 'Access denied, invalid token',
  getusersFail: (error: string): string => `Cannot get users =(, ${error} )`,
  loginFail: 'Login failed =(',
  loginFailWithError: (error: string): string => `Could not login user =(. ${error}`,
};
