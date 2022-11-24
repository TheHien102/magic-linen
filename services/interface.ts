import { VariantParams } from './types';

export type IVariantItem = {
  formikData: any;
  data: VariantParams;
  handleDelete?: any;
};

export type IItemVariant = {
  name: string;
  data: VariantParams[];
};
