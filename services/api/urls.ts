const BASEURL =
  process.env.NEXT_PUBLIC_API_ENDPOINT || 'https://linen-a-be.herokuapp.com/v1';

// const BASEURL = 'http://localhost:5000/v1';

export const API_URL = {
  home: BASEURL,
  adminLogin: `${BASEURL}/account/login/`,
  roleAdmin: `${BASEURL}/account/profile`,
  logout: `${BASEURL}/account/logout`,
  addProduct: `${BASEURL}/product/create`,
  updateProduct: `${BASEURL}/product/update`,
  adminListProduct: `${BASEURL}/product/list`,
  getProductById: `${BASEURL}/product/get`,
  createAdmin: `${BASEURL}/account/create_admin`,
  listAdmin: `${BASEURL}/account/list`,
  categoryList: `${BASEURL}/category/getSorted`,
  register: `${BASEURL}/account/register/`,
  updateProfileUser: `${BASEURL}/account/update_profile_user/`,
  requestForgetPassword: `${BASEURL}/account/request_forget_password`,
  setNewPassword: `${BASEURL}/account/forget_password`,
  permissionsList: `${BASEURL}/permission/list`,
  createPermissions: `${BASEURL}/permission/create`,
  profile: `${BASEURL}/account/profile`,

  listGroupById: `${BASEURL}/group/get/`,
  listAllGroup: `${BASEURL}/group/list`,
  updateGroupById: `${BASEURL}/group/update/`,
  createGroup: `${BASEURL}/group/create/`,

  userListProduct: `${BASEURL}/product/list`,

  provinceList: `${BASEURL}/province/list`,
  provinceCreateAll: `${BASEURL}/province/addAll`,
  provinceGetChild: `${BASEURL}/province/getChild`,

  addToCart: `${BASEURL}/cart/create`,
  cartList: `${BASEURL}/cart/list`,
  cartUpdateItem: `${BASEURL}/cart/update`,

  addressList: `${BASEURL}/address/list`,
  addressCreate: `${BASEURL}/address/create`,

  createOrder: `${BASEURL}/order/create`,
  listOrder: `${BASEURL}/order/list`,
};
