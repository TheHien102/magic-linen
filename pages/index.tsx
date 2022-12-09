import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { Layout } from '../components/Global/Layout/Layout';
import HomeLinen from '../components/Home/Home';
import { ProductApi } from '../services/api/product';
import { getCookie } from '../services/cookies';
import { ProductParams } from '../services/types';

interface IHome {
  listProduct: ProductParams[];
}

export default function Home({ listProduct }: IHome) {
  console.log('result: ', listProduct);
  return (
    <>
      <Head>
        <title>Magic Linen</title>
        <meta name='description' content='Magic Linen' />
      </Head>
      <Layout>
        <HomeLinen listProduct={listProduct} />
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  const [listProduct] = await Promise.all([ProductApi.listProductUser(4)]);

  return {
    props: { listProduct: listProduct.data.data },
  };
}
