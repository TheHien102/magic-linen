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
import React, { useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';

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

const Size = (props: Props) => {
  const [size, setSize] = useState<string[]>([]);
  const handleChangeSize = (event: SelectChangeEvent<typeof size>) => {
    const {
      target: { value },
    } = event;
    setSize(typeof value === 'string' ? value.split(',') : value);
    let data = {
      name: 'size',
      property: value.at(value.length - 1),
      addPrice: 0,
    };
    //   formik.values.variants.push(data);
    console.log('size: ', size);
  };

  const handleDelete = (i: string) => {
    setSize(size.filter((item) => item !== i));
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
      {size.map((data, i) => (
        <Grid container sx={{ marginTop: '5px' }} key={data} spacing={1}>
          <Grid item xs={12} md={6}>
            <TextField
              label={'Property'}
              defaultValue={data}
              fullWidth
              disabled
              size='small'
            />
          </Grid>
          <Grid item xs={12} md={4.5}>
            <TextField label={'Price'} fullWidth size='small' />
          </Grid>
          <Grid item xs={12} md={1.5}>
            <Button
              sx={{ mt: 0.3 }}
              variant='outlined'
              color='error'
              onClick={() => handleDelete(data)}
            >
              <IndeterminateCheckBoxIcon color='error' />
            </Button>
          </Grid>
        </Grid>
      ))}
    </Box>
  );
};

export default Size;
