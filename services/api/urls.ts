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
  permissionsList: `${BASEURL}/permission/list`,
  createPermissions: `${BASEURL}/permission/create`,

  listGroupById: `${BASEURL}/group/get/`,
  listAllGroup: `${BASEURL}/group/list`,
  updateGroupById: `${BASEURL}/group/update/`,
  createGroup: `${BASEURL}/group/create/`,

  userListProduct: `${BASEURL}/product/list_product_for_user`,
};
