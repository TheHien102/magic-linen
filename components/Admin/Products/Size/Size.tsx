import {
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
  Checkbox,
  Box,
  Grid,
  TextField,
  Button,
} from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import SizeItem from './SizeItem';
import { VariantParams } from '../../../../services/types';
import { names } from '../../../../utils/dataConfig';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface ISize {
  formikData: any;
  sizeArray: VariantParams[];
}

const Size = ({ formikData, sizeArray }: ISize) => {
  const [size, setSize] = useState<VariantParams[]>([]);

  useEffect(() => {
    setSize(sizeArray);
  }, []);

  const handleDelete = (i: string) => {
    setSize(size.filter((item) => item.property !== i));
    console.log('delete');
  };

  const handleChecked = (it: VariantParams) => {
    if (size.find((i) => i.property === it.property) != undefined) return true;
    return false;
  };

  const handleModifySizeArray = (it: VariantParams) => {
    if (handleChecked(it)) {
      setSize(size.filter((size) => size.property !== it.property));
    } else {
      setSize((size) => [...size, it]);
    }
  };

  return (
    <Box
      sx={{
        border: '1px solid gray',
        p: 3,
        borderRadius: 2,
        position: 'relative',
      }}
    >
      <FormControl fullWidth size='small'>
        <InputLabel id='variants'>Size</InputLabel>
        <Select
          labelId='variants'
          id='variants'
          multiple
          value={size}
          input={<OutlinedInput label='Size' />}
          renderValue={(selected) => selected.map((e) => e.property).join(', ')}
          MenuProps={MenuProps}
        >
          {names.map((it) => (
            <MenuItem
              key={it.property}
              value={it.property}
              onClick={() => handleModifySizeArray(it)}
            >
              <Checkbox checked={handleChecked(it)} disabled />
              <ListItemText primary={it.property} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {size.map((data) => (
        <SizeItem
          key={data.property}
          formikData={formikData}
          data={data}
          handleDelete={() => handleDelete(data.property)}
        />
      ))}
    </Box>
  );
};

export default Size;
