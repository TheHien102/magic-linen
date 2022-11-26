import { Box } from '@mui/material';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import React from 'react';
import Layout from '../../../components/Admin/LayoutAdmin/LayoutAdmin';
import UpdateProduct from '../../../components/Admin/Products/UpdateProduct/UpdateProduct';
import { ProductApi } from '../../../services/api/product';
import { getCookie } from '../../../services/cookies';

interface IProductInfo {
  res: any;
  categoryList: any;
}

const ProductInfo = ({ res, categoryList }: IProductInfo) => {
  console.log('IProductInfo: ', res);
  return (
    <>
      <Head>
        <title>Update Product</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        <UpdateProduct data={res.data} categoryList={categoryList.data.data} />
      </Layout>
    </>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const token = await getCookie('token', ctx);

  if (token) {
    try {
      const { productId } = ctx.query;

      const [res, categoryList] = await Promise.all([
        ProductApi.getProductById(productId as string, token),
        ProductApi.categoryList(token),
      ]);
      console.log('categoryList: ', categoryList);
      return {
        props: {
          res: res,
          categoryList: categoryList,
          // categoryList.data.data,
        },
      };
    } catch (e) {
      console.log('error: ', e);
    }

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

export default ProductInfo;