import { Box, Typography } from '@mui/material';
import React from 'react';
import ProductSwiper from './ProductSwiper/ProductSwiper';

type Props = {};

const ProductDetail = (props: Props) => {
  return (
    <Box sx={{ display: 'flex', marginX: '120px' }}>
      <Box sx={{ width: '65%' }}>
        <ProductSwiper />
      </Box>
      <Box sx={{ w: '30%' }}>
        <Typography
          component={'h1'}
          sx={{ fontWeight: 'semibold', fontSize: '24px' }}
        >
          LINEN BEACH SHIRT TAOS
        </Typography>
      </Box>
    </Box>
  );
};

export default ProductDetail;
