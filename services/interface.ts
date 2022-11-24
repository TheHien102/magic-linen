import { VariantParams } from './types';

export interface IVariantItem {
  formikData: any;
  data: VariantParams;
  handleDelete: any;
}

export interface IItemVariant {
  name: string;
  data: VariantParams[];
}
