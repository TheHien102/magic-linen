import { Box, Button, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import ModalVariant from '../ModalVariant/ModalVariant';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import VariantItem from './VariantItem';
type Props = {};

interface IProperty {
  id: number;
  name: string;
  addPrice: number;
}

interface IVariant {
  formikData: any;
}

const Variant = ({ formikData }: IVariant) => {
  const [openModalVariant, setOpenModalVariant] = useState(false);
  const [countVariant, setCountVariant] = useState(0);
  const [variant, setVariant] = useState<any>([]);
  const [property, setProperty] = useState<IProperty[]>([
    // { id: 100, name: 'cc', addPrice: 10 },
    // { id: 200, name: 'cc1', addPrice: 10 },
    // { id: 13, name: 'cc2', addPrice: 10 },
  ]);

  const handleAddVariant = () => {
    setCountVariant(countVariant + 1);
    // property.id = count
    let data = {
      id: countVariant,
      name: '',
      addPrice: 0,
    };
    setVariant((variant: any) => [...variant, data]);
  };

  const handleDeleteVariant = (i: number) => {
    setVariant(variant.filter((item: { id: number }) => item.id !== i));
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
      {variant &&
        variant.length !== 0 &&
        variant.map((_data: any, index: React.Key | null | undefined) => (
          <Box
            key={_data.id}
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
            <Button
              sx={{
                position: 'absolute',
                top: -5,
                right: -15,
              }}
              onClick={() => handleDeleteVariant(_data.id)}
            >
              <HighlightOffIcon />
            </Button>
            <VariantItem formikData={formikData} />
          </Box>
        ))}
      <Button
        variant='outlined'
        sx={{ fontWeight: 'bold', mt: 1 }}
        onClick={() => handleAddVariant()}
      >
        New variant &nbsp;
        <PlaylistAddIcon />
      </Button>
    </>
  );
};

export default Variant;
