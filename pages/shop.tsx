import Head from 'next/head';
import React from 'react';
import { Layout } from '../components/Global/Layout/Layout';
import ShopProduct from '../components/Shop/ShopProduct';

type Props = {};

const Shop = (props: Props) => {
  return (
    <>
      <Head>
        <title>Shop | Linen A</title>
        <meta name='description' content='Magic Linen' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        <ShopProduct />
      </Layout>
    </>
  );
};

export default Shop;
