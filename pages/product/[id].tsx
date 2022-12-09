import React from 'react';
import Head from 'next/head';
import { Layout } from '../../components/Global/Layout/Layout';
import ProductDetail from '../../components/ProductDetail/ProductDetail';
import { GetServerSidePropsContext } from 'next';
import { ProductApi } from '../../services/api/product';
import { ProductDetailPrams } from '../../services/types';
import Breadcrumb from '../../components/Global/Breadcumb/Breadcumb';
import { Box } from '@mui/material';

interface IProductPage {
  res: ProductDetailPrams;
}

const ProductPage = ({ res }: IProductPage) => {
  const dataBreadcrumb = res.categoryDescription.split(',').concat(res.name);
  return (
    <>
      <Head>
        <title>Shop | Linen A</title>
        <meta name='description' content='Magic Linen' />
      </Head>
      <Layout>
        <Box>
          <Breadcrumb data={dataBreadcrumb} />
          <ProductDetail data={res} />
        </Box>
      </Layout>
    </>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  try {
    const { id } = ctx.query;
    const [res] = await Promise.all([ProductApi.getProductById(id as string)]);
    return {
      props: {
        res: res.data,
      },
    };
  } catch (e) {
    console.log('error: ', e);
    return {
      props: {},
    };
  }
}

export default ProductPage;
