import React, { useRef } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import { VariantParams } from '../../../../services/types';

interface IVariantItem {
  index: number;
  variantName: string;
  data: VariantParams;
  handleDelete?: any;
  handleOnChange: (
    index: number,
    variantName: string,
    data: VariantParams,
    price: number,
    property: string
  ) => void;
}

const VariantItem = ({
  index,
  variantName,
  data,
  handleDelete,
  handleOnChange,
}: IVariantItem) => {
  const valueRef = useRef<any>(0);
  const valueRefProperty = useRef<any>('');

  return (
    <Grid container sx={{ marginTop: '5px' }} spacing={1}>
      <Grid item xs={12} md={6}>
        <>
          <TextField
            label={'Property'}
            inputRef={valueRefProperty}
            defaultValue={data.property}
            onChange={(e) =>
              handleOnChange(
                index,
                variantName,
                data,
                valueRef.current.value,
                valueRefProperty.current.value
              )
            }
            fullWidth
            size='small'
          />
        </>
      </Grid>
      <Grid item xs={12} md={4.5}>
        <TextField
          label={'Price'}
          inputRef={valueRef}
          defaultValue={data.addPrice}
          onChange={(e) =>
            handleOnChange(
              index,
              variantName,
              data,
              valueRef.current.value,
              valueRefProperty.current.value
            )
          }
          fullWidth
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
  );
};

export default VariantItem;
