import { Box, Typography } from '@mui/material';
import React from 'react';
import StarsReview from '../Global/StarsReview/StarsReview';
import ProductSwiper from './ProductSwiper/ProductSwiper';

type Props = {};

const ProductDetail = (props: Props) => {
  return (
    <Box sx={{ display: 'flex', marginX: '120px', gap: '35px' }}>
      <Box sx={{ width: '60%' }}>
        <ProductSwiper />
      </Box>
      <Box sx={{ w: '30%' }}>
        <Typography
          component={'h1'}
          sx={{ fontWeight: 'semibold', fontSize: '24px' }}
        >
          LINEN BEACH SHIRT TAOS
        </Typography>
        <StarsReview />
        <Typography
          sx={{
            textDecoration: 'line-through',
            fontFamily: 'Josefin Sans',
            ml: 1,
            fontWeight: 'bold',
            color: 'gray',
          }}
        >
          Ol Price
        </Typography>
      </Box>
    </Box>
  );
};

export default ProductDetail;
