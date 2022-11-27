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

export type AdminProductParams = {};
