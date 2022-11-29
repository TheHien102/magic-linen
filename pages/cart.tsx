import Head from 'next/head';
import React from 'react';
import CartUser from '../components/Cart/Cart';
import { Layout } from '../components/Global/Layout/Layout';

const Cart = () => {
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
