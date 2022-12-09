import Head from 'next/head';
import React, { useEffect } from 'react';
import CartUser from '../components/Cart/Cart';
import { Layout } from '../components/Global/Layout/Layout';
import { LOCAL_SAVE_LIMITER, LOCAL_SAVE_PREFIX } from '../utils/dataConfig';

const Cart = () => {
  return (
    <>
      <Head>
        <title>Cart | Magic Linen</title>
        <meta name='description' content='Magic Linen' />
      </Head>
      <Layout>
        <CartUser />
      </Layout>
    </>
  );
};

export default Cart;
