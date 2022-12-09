import { Box } from '@mui/material';
import Head from 'next/head';
import React from 'react';
import CartUser from '../components/Cart/Cart';
import Breadcrumb from '../components/Global/Breadcumb/Breadcumb';
import { Layout } from '../components/Global/Layout/Layout';

const Cart = () => {
  return (
    <>
      <Head>
        <title>Cart | Linen A</title>
        <meta name='description' content='Magic Linen' />
      </Head>
      <Layout>
        <Box>
          <Breadcrumb data={['Home', 'My Cart']} />
          <CartUser />
        </Box>
      </Layout>
    </>
  );
};

export default Cart;
