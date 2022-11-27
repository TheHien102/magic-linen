import React, { useRef } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import { IVariantItem } from '../../../../services/interface';

const SizeItem = ({ data, handleDelete, handleOnChange }: IVariantItem) => {
  const valueRef = useRef<any>(0);

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
          onChange={(e) => handleOnChange(data, Number(e.target.value))}
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
