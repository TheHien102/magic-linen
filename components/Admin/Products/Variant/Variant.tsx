import { Box, Button, Grid, TextField } from '@mui/material';
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import ModalVariant from '../ModalVariant/ModalVariant';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import VariantItem from './VariantItem';
import { IItemVariant } from '../../../../services/interface';
import { VariantParams } from '../../../../services/types';
import AddBoxIcon from '@mui/icons-material/AddBox';

type IVariant = {
  // variantsArrayTemp: VariantParams[];
  variantsArray: VariantParams[];
  setVariantsArray: Dispatch<SetStateAction<VariantParams[]>>;
  index: number;
  handleOnChangeVariantName: (index: number, name: string) => void;
  variantName: string;
  handleDeleteVariant: (value: string) => void;
};

const Variant = ({
  variantsArray,
  index,
  setVariantsArray,
  variantName,
  handleOnChangeVariantName,
  handleDeleteVariant,
}: IVariant) => {
  const [variant, setVariant] = useState<VariantParams[]>([]);
  const valueNameRef = useRef<any>(null);

  useEffect(() => {
    setVariant(variantsArray);
  }, []);

  // useEffect(() => {
  //   if (variant.length > 0) {
  //     console.log(variant);
  //   }
  // }, [variant]);

  const [count, setCount] = useState(0);

  const handleAdd = () => {
    setCount(count + 1);
    let data = {
      id: count,
      name: variantName,
      property: '',
      addPrice: 0,
    };
    setVariant((variant) => [...variant, data]);
  };

  const handleDelete = (id: number) => {
    console.log('id: ', id);
    setVariant(variant.filter((item) => item.id !== id));
  };

  const handleOnChange = (
    data: VariantParams,
    price: number,
    property: string
  ) => {
    let newVariant = {
      id: data.id,
      name: variantName,
      property: property,
      addPrice: price,
    };
    console.log('newVariant: ', newVariant);
    setVariantsArray(
      variantsArray.map((item) => (item.name === data.name ? newVariant : item))
    );
  };

  return (
    <Box
      sx={[
        {
          border: '1px solid gray',
          p: 3,
          mt: 3,
          borderRadius: 2,
          position: 'relative',
        },
      ]}
    >
      <TextField
        label={'New variant'}
        inputRef={valueNameRef}
        defaultValue={variantName}
        onChange={(e) => handleOnChangeVariantName(index, e.target.value)}
        fullWidth
        size='small'
      />
      <Button
        sx={{
          position: 'absolute',
          top: -5,
          right: -15,
        }}
        onClick={() => handleDeleteVariant(variantName)}
      >
        <HighlightOffIcon />
      </Button>
      {variant.map((data) => (
        <VariantItem
          key={data.id}
          data={data}
          handleOnChange={handleOnChange}
          handleDelete={handleDelete}
        />
      ))}
      <Button
        variant='outlined'
        sx={{ mt: 1, width: '100% ' }}
        onClick={() => handleAdd()}
      >
        <AddBoxIcon />
      </Button>
    </Box>
  );
};

export default Variant;
