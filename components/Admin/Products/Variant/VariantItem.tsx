import React, { useRef, useState } from 'react';
import { Box, Button, Grid, TextField } from '@mui/material';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import AddBoxIcon from '@mui/icons-material/AddBox';
import VariantItemDetail from './VariantItemDetail';
import { VariantParams } from '../../../../services/types';
import { IVariantItem } from '../../../../services/interface';

const VariantItem = ({ formikData, data }: IVariantItem) => {
  const [property, setProperty] = useState<VariantParams[]>([
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

  const valueRef = useRef<any>(0);
  const valueRefProperty = useRef<any>('');
  const valueRefName = useRef<any>('');
  const handleOnBlur = () => {
    let dataFormik = {
      name: valueRefName.current.value,
      property: valueRefProperty.current.value,
      addPrice: valueRef.current.value,
    };
    if (valueRef.current.value != '') {
      formikData.push(dataFormik);
    }

    console.log('dataFormik: ', dataFormik);
  };

  return (
    <>
      <Grid container sx={{ marginTop: '5px' }} spacing={1}>
        <Grid item xs={12} md={6}>
          <TextField
            label={'Property'}
            inputRef={valueRefProperty}
            defaultValue={data.property}
            onBlur={() => handleOnBlur()}
            fullWidth
            size='small'
          />
        </Grid>
        <Grid item xs={12} md={4.5}>
          <TextField
            label={'Price'}
            inputRef={valueRef}
            defaultValue={data.addPrice}
            onBlur={() => handleOnBlur()}
            fullWidth
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

      {property.map((data, i) => (
        <VariantItemDetail
          data={data}
          nameField={valueRefName.current.value}
          formikData={formikData}
          key={data.id}
        />
      ))}
    </>
  );
};

export default VariantItem;
