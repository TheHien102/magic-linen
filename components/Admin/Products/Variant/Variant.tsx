import { Box, Button, Grid, TextField } from '@mui/material';
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import VariantItem from './VariantItem';
import { VariantParams } from '../../../../services/types';
import AddBoxIcon from '@mui/icons-material/AddBox';

type IVariant = {
  index: number;
  variantName: string;
  variantItems: VariantParams[];
  handleDeleteVariant: (value: string) => void;
  handleOnChangeVariantName: (index: number, name: string) => void;
  handleAddOtherVariantItem: (name: string) => void;
  handleChangeOtherVariantItem: (
    index: number,
    variantName: string,
    data: VariantParams,
    price: number,
    property: string
  ) => void;
  handleDeleteVariantItem: (property: string) => void;
};

const Variant = ({
  index,
  variantName,
  variantItems,
  handleDeleteVariant,
  handleOnChangeVariantName,
  handleAddOtherVariantItem,
  handleChangeOtherVariantItem,
  handleDeleteVariantItem,
}: IVariant) => {
  const [items, setItems] = useState<VariantParams[]>([]);
  const valueNameRef = useRef<any>(null);

  useEffect(() => {
    setItems(variantItems);
  }, [variantItems]);

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
      <>
        {items.map((item, index) => (
          <VariantItem
            key={item.id}
            index={index}
            variantName={variantName}
            data={item}
            handleOnChange={handleChangeOtherVariantItem}
            handleDelete={handleDeleteVariantItem}
          />
        ))}
      </>
      <Button
        variant='outlined'
        sx={{ mt: 1, width: '100% ' }}
        onClick={() => handleAddOtherVariantItem(variantName)}
      >
        <AddBoxIcon />
      </Button>
    </Box>
  );
};

export default Variant;
