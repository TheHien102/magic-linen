import Head from 'next/head';
import { Layout } from '../components/Global/Layout/Layout';
import HomeLinen from '../components/Home/Home';

export default function Home() {
  return (
    <>
      <Head>
        <title>Magic Linen</title>
        <meta name='description' content='Magic Linen' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        <HomeLinen />
      </Layout>
    </>
  );
}
