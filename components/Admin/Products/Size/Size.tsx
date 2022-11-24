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

interface IProperty {
  id: number;
  name: string;
  addPrice: number;
}

type Props = {};

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

const namesDefault = ['S', 'M', 'L', 'XL', 'XXL'];
const names: VariantParams[] = [
  {
    id: 0,
    name: 'size',
    property: 'S',
    addPrice: 0,
    status: 1,
  },
  {
    id: 0,
    name: 'size',
    property: 'M',
    addPrice: 0,
    status: 1,
  },
  {
    id: 0,
    name: 'size',
    property: 'L',
    addPrice: 0,
    status: 1,
  },
  {
    id: 0,
    name: 'size',
    property: 'XL',
    addPrice: 0,
    status: 1,
  },
  {
    id: 0,
    name: 'size',
    property: 'XXL',
    addPrice: 0,
    status: 1,
  },
];

interface ISize {
  formikData: any;
  sizeArray: VariantParams[];
}

const Size = ({ formikData, sizeArray }: ISize) => {
  const [size, setSize] = useState<VariantParams[]>([]);

  useEffect(() => {
    setSize(sizeArray);
  }, []);

  const handleChangeSize = (event: SelectChangeEvent<typeof size>) => {
    const {
      target: { value },
    } = event;

    let newSize: VariantParams = {
      id: 99,
      name: 'size',
      property: value[value.length - 1],
      addPrice: 0,
      status: 1,
    };
    setSize([...size, newSize]);
    console.log('newSize pick: ', newSize);
    console.log('value event: ', event.target.value);
    // setValueField(size.at(size.length - 1));
    // console.log('size index: ', size.indexOf('M'));
  };

  const handleDelete = (i: string) => {
    setSize(size.filter((item: any) => item !== i));
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
          onChange={handleChangeSize}
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
          handleDelete={() => handleDelete(data)}
        />
      ))}
    </Box>
  );
};

export default Size;
