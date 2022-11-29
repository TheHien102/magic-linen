import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  Box,
} from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
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
  setSizeArray: Dispatch<SetStateAction<VariantParams[]>>;
}

const Size = ({ formikData, sizeArray, setSizeArray }: ISize) => {
  const handleDelete = (i: string) => {
    setSizeArray(sizeArray.filter((item) => item.property !== i));
    console.log('delete');
  };

  const handleChecked = (it: VariantParams) => {
    if (sizeArray.find((i) => i.property === it.property) != undefined)
      return true;
    return false;
  };

  const handleModifySizeArray = (it: VariantParams) => {
    if (handleChecked(it)) {
      setSizeArray(sizeArray.filter((size) => size.property !== it.property));
    } else {
      setSizeArray((size) => [...size, it]);
    }
  };

  const handleOnChange = (data: VariantParams, price: number) => {
    let newSize = {
      id: data.id,
      name: 'size',
      property: data.property,
      addPrice: price,
    };

    setSizeArray(
      sizeArray.map((item) =>
        item.property === data.property ? newSize : item
      )
    );
  };

  return (
    <Box
      sx={{
        border: '2px solid hsla(48,8%,88%,.6)',
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
          value={sizeArray}
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
      {sizeArray.map((data) => (
        <SizeItem
          key={data.property}
          formikData={formikData}
          data={data}
          handleOnChange={handleOnChange}
          handleDelete={() => handleDelete(data.property)}
        />
      ))}
    </Box>
  );
};

export default Size;
