import { Box } from '@mui/material';
import React from 'react';

type Props = {};

const CheckoutCart = (props: Props) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ width: '60%' }}></Box>
      <Box sx={{ width: '35%' }}></Box>
    </Box>
  );
};

export default CheckoutCart;
