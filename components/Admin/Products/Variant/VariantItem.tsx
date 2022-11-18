import React, { useState } from 'react';
import { Box, Button, Grid, TextField } from '@mui/material';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import AddBoxIcon from '@mui/icons-material/AddBox';

interface IProperty {
  id: number;
  name: string;
  addPrice: number;
}

const VariantItem = () => {
  const [property, setProperty] = useState<IProperty[]>([
    // { id: 100, name: 'cc', addPrice: 10 },
    // { id: 200, name: 'cc1', addPrice: 10 },
    // { id: 13, name: 'cc2', addPrice: 10 },
  ]);
  const [count, setCount] = useState(0);

  const handleAdd = () => {
    setCount(count + 1);
    // property.id = count
    let data = {
      id: count,
      name: '',
      addPrice: 0,
    };
    setProperty((property: any) => [...property, data]);
  };

  const handleDelete = (i: number) => {
    setProperty(property.filter((item) => item.id !== i));
  };

  return (
    <>
      <TextField label={'Name variant'} fullWidth size='small' />
      <Grid container sx={{ marginTop: '5px' }} spacing={1}>
        <Grid item xs={12} md={6}>
          <TextField label={'Property'} fullWidth size='small' />
        </Grid>
        <Grid item xs={12} md={4.5}>
          <TextField label={'Price'} fullWidth size='small' />
        </Grid>
      </Grid>
      {property.map((data, i) => (
        <Grid container sx={{ marginTop: '5px' }} key={data.id} spacing={1}>
          <Grid item xs={12} md={6}>
            <TextField
              label={'Property'}
              defaultValue={data.name}
              fullWidth
              size='small'
            />
          </Grid>
          <Grid item xs={12} md={4.5}>
            <TextField
              label={'Price'}
              fullWidth
              defaultValue={data.name}
              size='small'
            />
          </Grid>
          <Grid item xs={12} md={1.5}>
            <Button
              sx={{ mt: 0.3 }}
              variant='outlined'
              color='error'
              onClick={() => handleDelete(data.id)}
            >
              <IndeterminateCheckBoxIcon color='error' />
            </Button>
          </Grid>
        </Grid>
      ))}
      <Button
        variant='outlined'
        sx={{ mt: 1, width: '100% ' }}
        onClick={() => handleAdd()}
      >
        <AddBoxIcon />
      </Button>
    </>
  );
};

export default VariantItem;
