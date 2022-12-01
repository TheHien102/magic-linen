import Head from 'next/head';
import React from 'react';
import CheckoutCart from '../components/Checkout/Checkout';
import { Layout } from '../components/Global/Layout/Layout';

type Props = {};

const Checkout = (props: Props) => {
  return (
    <>
      <Head>
        <title>Checkout | Magic Linen</title>
        <meta name='description' content='Magic Linen' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        <CheckoutCart />
      </Layout>
    </>
  );
};

export default Checkout;
