import { VariantParams } from './types';

export type IVariantItem = {
  formikData?: any;
  data: VariantParams;
  handleDelete?: any;
  handleOnChange: (data: VariantParams, price: number) => void;
};

export type IItemVariant = {
  id: number;
  name: string;
  data: VariantParams[];
};
