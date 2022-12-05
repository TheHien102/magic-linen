import Head from 'next/head';
import React, { useEffect } from 'react';
import CartUser from '../components/Cart/Cart';
import { Layout } from '../components/Global/Layout/Layout';
import { LOCAL_SAVE_LIMITER, LOCAL_SAVE_PREFIX } from '../utils/dataConfig';

const Cart = () => {
  useEffect(() => {
    console.log(
      'cart storage: ',

      localStorage
        .getItem(LOCAL_SAVE_PREFIX)
        ?.toString()
        .split(LOCAL_SAVE_LIMITER)
        .map((data) => JSON.parse(data.replace('\\', ''))) || '{}'
    );
  }, []);
  return (
    <>
      <Head>
        <title>Cart | Magic Linen</title>
        <meta name='description' content='Magic Linen' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        <CartUser />
      </Layout>
    </>
  );
};

export default Cart;
