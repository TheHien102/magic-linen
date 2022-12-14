import Head from 'next/head';
import React from 'react';
import Layout from '../../../components/Admin/LayoutAdmin/LayoutAdmin';
import ListDetailProduct from '../../../components/Admin/Products/Products';
import { getCookie } from '../../../services/cookies';
import { GetServerSidePropsContext } from 'next';

const Product = () => {
  return (
    <>
      <Head>
        <title>List Product | Linen A</title>
        <meta name='description' content='Generated by create next app' />
      </Head>
      <Layout>
        <ListDetailProduct />
      </Layout>
    </>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const token = await getCookie('token', ctx);

  if (token) {
    return {
      props: {},
    };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
}

export default Product;
