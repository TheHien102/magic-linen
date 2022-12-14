import { type } from 'os';

export type LoginAdminPrams = {
  username: string;
  password: string;
};

export type AddProductPrams = {
  id: number;
  name: string;
  discount: number;
  description: string;
  price: number;
  productCategoryId: number;
  variants: VariantParams[];
  assets: AssetsParams[];
};

export type ReivewParams = {
  createdBy: string;
  createdDate: string;
  modifiedBy: string;
  modifiedDate: string;
  status: number;
  id: number;
  rate: number;
  comment: string;
};

export type CartItemParams = {
  id: number;
  productId: number;
  variants: VariantParams[];
  quantity: number;
  totalPrice: number;
  name: string;
  price: number;
  mainImg: string;
};

export type AddToCartParams = {
  productId: number;
  variants: VariantParams[];
  quantity: number;
};

export type CartListParams = {
  accountId: number;
  status: number;
};

export type ProductDetailPrams = {
  id: number;
  name: string;
  mainImg: string;
  discount: number;
  description: string;
  categoryDescription: string;
  price: number;
  productCategoryId: number;
  variants: VariantParams[];
  assets: AssetsParams[];
  reviews: ReivewParams[];
};

export type PermissionRequest = {
  action: string;
  description: string;
  name: string;
  nameGroup: string;
  showMenu: boolean;
};

export type GroupUpdateRequest = {
  id: number;
  name: string;
  description: string;
  permissions: PermissionPrams[];
};

export type GroupCreateRequest = {
  kind: number;
  name: string;
  description: string;
  permissions: PermissionPrams[];
};

export type ProductParams = {
  id: number;
  name: string;
  mainImg: string;
  discount: number;
  description: string;
  price: number;
  productCategoryId: number;
  variants: VariantParams[];
};

export type ProfileParams = {
  avatar: string;
  email: string;
  fullName: string;
  group: GroupParams;
  id: number;
  isSuperAdmin: boolean;
  kind: number;
  lastLogin: string;
  phone: string;
  username: string;
  createdDate: string;
};

export type GroupParams = {
  id: number;
  status: number;
  name: string;
  description: string;
  kind: number;
  permissions: PermissionPrams[];
};

export type PermissionPrams = {
  action: string;
  description: string;
  id: number;
  name: string;
  nameGroup: string;
  showMenu: boolean;
  status: number;
};

export type FilterPermissions = {
  name: string;
  list: PermissionPrams[];
};

export type MenuItemParams = {
  action: string;
  nameGroup: string;
  name: string;
};

export type AddProvinceParams = {
  name: string;
  level: number;
  parentId: number;
};

export type AddAllProvinceParams = {
  names: string[];
  level: number;
  parentId: number;
};

export type ProvinceParam = { id: number; name: string; level: number };

export type MenuParams = {
  name: string;
  list: MenuItemParams[];
};

export type TokenResponse = {
  access: string;
  refresh: string;
};

export type ProjectListSort = 'ascend' | 'descend';
export type ProjectListParams = {
  page: number;
  search?: string;
  per_page?: number;
  sort?: ProjectListSort;
};

export type VariantParams = {
  id: number;
  name: string;
  property: string;
  addPrice: number;
};

export type VariantCheckParams = {
  id: number;
  name: string;
  property: string;
  addPrice: number;
  checked: boolean;
};

export type AssetsParams = {
  id: number;
  type: string;
  link: string;
};

export type CategoryParams = {
  id: number;
  name: string;
  categoryList?: CategoryParams[];
};

export type RegisterPrams = {
  username: string;
  password: string;
  fullName: string;
  phone: string;
  avatar?: string;
  email: string;
};

export type UpdateProfileUserPrams = {
  username?: string;
  password?: string;
  oldPassword?: string;
  fullName?: string;
  avatar?: string;
  email?: string;
  phone?: string;
};

export type UserStorage = {
  fullName: string;
  avatarPath: string;
  phoneNumber: string;
};

export type SetNewPassword = {
  newPassword: string;
  idHash: string;
  otp: string;
};

export type AdminProductParams = {};

export type ProductDetail = {
  id: number;
  productId: number;
  variants: VariantParams[];
  quantity: number;
  price: number;
  discount: number;
  mainImg: string;
  name: string;
  createdDate: string;
  modifiedDate: string;
};

export type OrderListParams = {
  page: number;
  size: number;
  sort: string[];
};

export type AddressCreateParams = {
  province_cityId: number;
  province_districtId: number;
  province_wardId: number;
  details: string;
  phone: string;
};

export type ListAddressParams = {
  id: number;
  receiverName: string;
  city: ProvinceParam;
  district: ProvinceParam;
  ward: ProvinceParam;
  phone: string;
  details: string;
};

export type OrderGuestParam = {
  cartItemsList?: {
    productId: number;
    variants: VariantParams[];
    quantity: number;
  };
  cartItemIdsList?: number[];
  address: string;
  note: string;
  phoneNumber: string;
  username: string;
  paymentType: number;
};
