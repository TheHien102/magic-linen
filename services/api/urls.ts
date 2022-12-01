const BASEURL =
  process.env.NEXT_PUBLIC_API_ENDPOINT || 'https://linen-a-be.herokuapp.com/v1';

export const API_URL = {
  home: BASEURL,
  adminLogin: `account/login/`,
  roleAdmin: `account/profile`,
  logout: `account/logout`,
  addProduct: `product/create`,
  updateProduct: `product/update`,
  adminListProduct: `product/list_product_for_admin`,
  getProductById: `product/get`,
  createAdmin: `account/create_admin`,
  listAdmin: `account/list`,
  categoryList: `category/getSorted`,
  register: `account/register/`,
};
