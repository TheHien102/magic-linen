import { Box, Button, Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
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
};

const Variant = ({ formikData, variantsArray, variantName }: IVariant) => {
  const [countVariant, setCountVariant] = useState(0);
  const [variant, setVariant] = useState<VariantParams[]>([]);

  useEffect(() => {
    setVariant(variantsArray);
  }, []);

  useEffect(() => {
    if (variant.length > 0) {
      console.log(variant);
    }
  }, [variant]);

  const handleAddVariant = () => {
    setCountVariant(countVariant + 1);
    let data = {
      id: countVariant,
      name: '',
      addPrice: 0,
    };
    setVariant((variant: any) => [...variant, data]);
  };

  const handleDeleteVariant = (i: number) => {
    setVariant(variant.filter((item) => item.id !== i));
  };

  // const handleChange = (e: any, i: number) => {
  //   let data = {
  //     id: i,
  //     name: e.target.value,
  //     addPrice: 0,
  //   };
  //   setProperty(property.map((item) => (item.id === i ? data : item)));
  // };

  return (
    <>
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
        {/* <p>{variantName}</p> */}
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
          // onClick={() => handleDeleteVariant(_data.id)}
        >
          <HighlightOffIcon />
        </Button>
        {variant.map((data, index) => (
          <>
            <VariantItem data={data} formikData={formikData} />
          </>
        ))}
        <Button
          variant='outlined'
          sx={{ mt: 1, width: '100% ' }}
          // onClick={() => handleAdd()}
        >
          <AddBoxIcon />
        </Button>
      </Box>
      {/* <Button
        variant='outlined'
        sx={{ fontWeight: 'bold', mt: 1 }}
        onClick={() => handleAddVariant()}
      >
        New variant &nbsp;
        <PlaylistAddIcon />
      </Button> */}
    </>
  );
};

export default Variant;
