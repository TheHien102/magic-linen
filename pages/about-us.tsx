import Head from 'next/head';
import React from 'react';
import AboutLinenA from '../components/AboutLinenA/AboutLinenA';
import { Layout } from '../components/Global/Layout/Layout';

const AboutUs = () => {
  return (
    <>
      <Head>
        <title>About Us | Linen A</title>
        <meta name='description' content='Magic Linen' />
      </Head>
      <Layout>
        <AboutLinenA />
      </Layout>
    </>
  );
};

export default AboutUs;
