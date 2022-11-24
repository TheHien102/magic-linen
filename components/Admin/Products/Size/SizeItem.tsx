import React, { useRef, useState } from 'react';
import { Box, Button, Grid, TextField } from '@mui/material';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { IVariantItem } from '../../../../services/interface';

const SizeItem = ({ formikData, data, handleDelete }: IVariantItem) => {
  const valueRef = useRef<any>(0);

  const handleOnBlur = () => {
    let dataFormik = {
      name: 'size',
      property: data,
      addPrice: valueRef.current.value,
    };
    console.log('data Formik: ', dataFormik);
    if (valueRef.current.value != '') {
      formikData.push(dataFormik);
    }
  };

  return (
    <Grid container sx={{ marginTop: '5px' }} spacing={1}>
      <Grid item xs={12} md={6}>
        <TextField
          label={'Property'}
          defaultValue={data.property}
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
          defaultValue={data ? data.addPrice : 0}
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
