const BASEURL =
  process.env.NEXT_PUBLIC_API_ENDPOINT || 'https://linen-a-be.herokuapp.com/v1';

export const API_URL = {
  home: BASEURL,
  adminLogin: `${BASEURL}/account/login/`,
  roleAdmin: `${BASEURL}/account/profile`,
  logout: `${BASEURL}/account/logout`,
  addProduct: `${BASEURL}/product/create`,
  updateProduct: `${BASEURL}/product/update`,
  adminListProduct: `${BASEURL}/product/list_product_for_admin`,
  getProductById: `${BASEURL}/product/get`,
  createAdmin: `${BASEURL}/account/create_admin`,
  listAdmin: `${BASEURL}/account/list`,
  categoryList: `${BASEURL}/category/getSorted`,
  register: `${BASEURL}/account/register/`,
};
