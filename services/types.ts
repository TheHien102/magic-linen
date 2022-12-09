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
  productId: number;
  variants: VariantParams[];
  quantity: number;
  totalPrice: number;
  name: string;
  price: number;
  mainImg: string;
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
};

export type AdminProductParams = {};
