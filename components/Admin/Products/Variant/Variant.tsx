import { Box, Button, Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ModalVariant from '../ModalVariant/ModalVariant';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import VariantItem from './VariantItem';
import { IItemVariant } from '../../../../services/interface';
import { VariantParams } from '../../../../services/types';
import AddBoxIcon from '@mui/icons-material/AddBox';

type IVariant = {
  formikData: any;
  variantsArray: VariantParams[];
  variantName: string;
  handleDeleteVariant: (value: string) => void;
};

const Variant = ({
  formikData,
  variantsArray,
  variantName,
  handleDeleteVariant,
}: IVariant) => {
  const [variant, setVariant] = useState<VariantParams[]>([]);

  useEffect(() => {
    setVariant(variantsArray);
  }, []);

  useEffect(() => {
    if (variant.length > 0) {
      console.log(variant);
    }
  }, [variant]);

  // const handleDeleteVariant = (i: string) => {
  //   setVariant(variant.filter((item) => item.name !== i));
  // };

  // const handleChange = (e: any, i: number) => {
  //   let data = {
  //     id: i,
  //     name: e.target.value,
  //     addPrice: 0,
  //   };
  //   setProperty(property.map((item) => (item.id === i ? data : item)));
  // };
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
        // inputRef={valueRefProperty}
        defaultValue={variantName}
        // onBlur={() => handleOnBlur()}
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
          handleDelete={handleDelete}
          formikData={formikData}
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
