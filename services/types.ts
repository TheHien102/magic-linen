export type LoginAdminPrams = {
  username: string;
  password: string;
};

export type AddProductPrams = {
  name: string;
  discount: string;
  description: string;
  price: string;
  productCategoryID: number;
  variants: { name: string; property: string; addPrice: number }[];
  assets: { type: string; data: string; isMain: number }[];
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
  status: 1;
};

export type AssetsParams = {
  id: 0;
  type: string;
  link: string;
};

export type AdminProductParams = {};
