import React, { useRef } from 'react';
import { Box, Button, Grid, TextField } from '@mui/material';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { VariantParams } from '../../../../services/types';

type Props = { data: VariantParams; formikData: any; nameField: string };

const VariantItemDetail = ({ data, formikData, nameField }: Props) => {
  const valueRef = useRef<any>(0);
  const valueRefProperty = useRef<any>('');

  const handleOnBlur = () => {
    let dataFormik = {
      name: nameField,
      property: valueRefProperty.current.value,
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
          defaultValue={data.name}
          inputRef={valueRefProperty}
          fullWidth
          onBlur={() => handleOnBlur()}
          size='small'
        />
      </Grid>
      <Grid item xs={12} md={4.5}>
        <TextField
          label={'Price'}
          fullWidth
          defaultValue={data.name}
          inputRef={valueRef}
          onBlur={() => handleOnBlur()}
          size='small'
        />
      </Grid>
      <Grid item xs={12} md={1.5}>
        <Button
          sx={{ mt: 0.3 }}
          variant='outlined'
          color='error'
          // onClick={() => handleDelete(data.id)}
        >
          <IndeterminateCheckBoxIcon color='error' />
        </Button>
      </Grid>
    </Grid>
  );
};

export default VariantItemDetail;
