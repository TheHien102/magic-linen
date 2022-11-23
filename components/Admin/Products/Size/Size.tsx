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
  console.log('sizeArray: ', sizeArray);
  const [size, setSize] = useState<VariantParams[]>([]);
  console.log('size inside: ', size);

  const [valueField, setValueField] = useState<any>();

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
    setSize(newSize);
    console.log('newSize pick: ', newSize);
    console.log('value event: ', event.target.value);
    // setValueField(size.at(size.length - 1));
    // console.log('size index: ', size.indexOf('M'));
  };

  const handleDelete = (i: string) => {
    setSize(size.filter((item: any) => item !== i));
    console.log('delete');
  };

  const handleChecked = (
    event: ChangeEvent<HTMLInputElement>,
    it: VariantParams
  ) => {
    if (event.target.checked) {
      console.log('checked');
    } else {
      console.log('unchecked');
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
          // onChange={handleChangeSize}
          input={<OutlinedInput label='Size' />}
          // renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {/* {names.length > 0 ? (
            'name.map'
          ) : (
            <>
              {names.map((it) => (
                <MenuItem key={it.name} value={it.name}>
                  <Checkbox checked={size.indexOf(it.name) > -1} />
                  <ListItemText primary={it.name} />
                </MenuItem>
              ))}
            </>
          )} */}
          {names.map((it) => (
            <MenuItem key={it.property} value={it.property}>
              <Checkbox
                checked={size.indexOf(it) > -1}
                // onChange={(e) => handleChecked(e, it)}
              />
              <ListItemText primary={it.property} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* {size.map((data: any) => (
        <SizeItem
          key={data}
          formikData={formikData}
          data={data}
          handleDelete={() => handleDelete(data)}
        />
      ))} */}
    </Box>
  );
};

export default Size;
