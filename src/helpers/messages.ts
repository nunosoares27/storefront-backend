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
