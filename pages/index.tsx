import Head from 'next/head';
import { Layout } from '../components/Global/Layout/Layout';
import HomeLinen from '../components/Home/Home';
import { ProductApi } from '../services/api/product';
import { ProductParams } from '../services/types';

interface IHome {
  listProduct: ProductParams[];
}

export default function Home({ listProduct }: IHome) {
  return (
    <>
      <Head>
        <title>Linen A</title>
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
