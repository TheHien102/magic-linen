import { Box } from '@mui/material';
import Head from 'next/head';
import React from 'react';
import Breadcrumb from '../components/Global/Breadcumb/Breadcumb';
import { Layout } from '../components/Global/Layout/Layout';
import ShopProduct from '../components/Shop/ShopProduct';

type Props = {};

const Shop = (props: Props) => {
  return (
    <>
      <Head>
        <title>Shop | Linen A</title>
        <meta name='description' content='Magic Linen' />
      </Head>
      <Layout>
        <Box>
          <Breadcrumb data={['Home', 'Linen clothing', 'Women clothing']} />
          <ShopProduct />
        </Box>
      </Layout>
    </>
  );
};

export default Shop;
