import React from 'react';
import Head from 'next/head';
import { Layout } from '../../components/Global/Layout/Layout';
import ProductDetail from '../../components/ProductDetail/ProductDetail';

type Props = {};

const ShopDetail = (props: Props) => {
  return (
    <>
      <Head>
        <title>Shop | Linen A</title>
        <meta name='description' content='Magic Linen' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        <ProductDetail />
      </Layout>
    </>
  );
};

export default ShopDetail;
