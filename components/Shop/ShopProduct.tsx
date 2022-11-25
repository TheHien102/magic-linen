import Image from 'next/image';
import React from 'react';
import * as S from './ShopProduct.styled';
import banner from '../../assets/images/bannerShop1.jpg';
import { Box, Grid, Pagination } from '@mui/material';
import ItemClothing from '../Global/ItemClothing/ItemClothing';
import Filter from './Filter/Filter';

type Props = {};

const ShopProduct = (props: Props) => {
  return (
    <S.ShopProduct>
      <S.Banner>
        <Image src={banner} alt='banner' />
      </S.Banner>
      <Grid container spacing={3} sx={{ mt: 3, mb: 7 }}>
        <Grid item sm={3}>
          <Filter />
        </Grid>
        <Grid item sm={9}>
          <Grid container spacing={3}>
            <Grid item sm={3}>
              <ItemClothing />
            </Grid>
            <Grid item sm={3}>
              <ItemClothing />
            </Grid>
            <Grid item sm={3}>
              <ItemClothing />
            </Grid>
            <Grid item sm={3}>
              <ItemClothing />
            </Grid>
            <Grid item sm={3}>
              <ItemClothing />
            </Grid>
          </Grid>
          <S.Center>
            <Pagination
              count={10}
              variant='outlined'
              showFirstButton
              showLastButton
            />
          </S.Center>
        </Grid>
      </Grid>
    </S.ShopProduct>
  );
};

export default ShopProduct;
