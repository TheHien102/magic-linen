import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import * as S from './ShopProduct.styled';
import banner from '../../assets/images/bannerShop1.jpg';
import { Box, Grid, Pagination } from '@mui/material';
import ItemClothing from '../Global/ItemClothing/ItemClothing';
import Filter from './Filter/Filter';
import { ProductApi } from '../../services/api/product';
import { ProductParams } from '../../services/types';

type Props = {};

const ShopProduct = (props: Props) => {
  const [listProduct, setListProduct] = useState<ProductParams[]>([]);
  useEffect(() => {
    getListProduct();
  }, []);

  const getListProduct = async () => {
    const [res] = await Promise.all([ProductApi.listProductUser(4)]);
    setListProduct(res.data.data);
  };

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
            {listProduct &&
              listProduct.map((data, index) => (
                <Grid key={index} item sm={3}>
                  <ItemClothing data={data} />
                </Grid>
              ))}
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
