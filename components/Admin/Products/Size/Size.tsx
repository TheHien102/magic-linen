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
import React, { useRef, useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import SizeItem from './SizeItem';

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

const names = ['S', 'M', 'L', 'XL', 'XXL'];

interface ISize {
  formikData: any;
  sizeArray?: any;
}

const Size = ({ formikData, sizeArray }: ISize) => {
  console.log('sizeArray: ', sizeArray);
  const [size, setSize] = useState<string[]>([]);
  const [valueField, setValueField] = useState<any>();

  const handleChangeSize = (event: SelectChangeEvent<typeof size>) => {
    const {
      target: { value },
    } = event;
    setSize(typeof value === 'string' ? value.split(',') : value);
    console.log('value pick: ', size);
    setValueField(size.at(size.length - 1));
  };

  const handleDelete = (i: string) => {
    setSize(size.filter((item) => item !== i));
    console.log('delete');
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
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={size.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {size.map((data) => (
        <SizeItem
          key={data}
          formikData={formikData}
          data={data}
          handleDelete={() => handleDelete(data)}
        />
      ))}
    </Box>
  );
};

export default Size;
