import React, { useRef, useState } from 'react';
import { Box, Button, Grid, TextField } from '@mui/material';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import AddBoxIcon from '@mui/icons-material/AddBox';

interface ISizeItem {
  formikData: any;
  data: any;
  handleDelete: any;
}

const SizeItem = ({ formikData, data, handleDelete }: ISizeItem) => {
  const valueRef = useRef<any>(0);

  const handleOnBlur = () => {
    let dataFormik = {
      name: 'size',
      property: data,
      addPrice: valueRef.current.value,
    };
    if (valueRef.current.value != '') {
      formikData.push(dataFormik);
    }
  };

  return (
    <Grid container sx={{ marginTop: '5px' }} spacing={1}>
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
        <TextField
          label={'Price'}
          inputRef={valueRef}
          fullWidth
          onBlur={() => handleOnBlur()}
          size='small'
        />
      </Grid>
      <Grid item xs={12} md={1.5}>
        <Button
          sx={{ mt: 0.3 }}
          variant='outlined'
          color='error'
          onClick={handleDelete}
        >
          <IndeterminateCheckBoxIcon color='error' />
        </Button>
      </Grid>
    </Grid>
  );
};

export default SizeItem;
