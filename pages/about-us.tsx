import { Box } from '@mui/material';
import Head from 'next/head';
import React from 'react';
import AboutLinenA from '../components/AboutLinenA/AboutLinenA';
import Breadcrumb from '../components/Global/Breadcumb/Breadcumb';
import { Layout } from '../components/Global/Layout/Layout';

const AboutUs = () => {
  return (
    <>
      <Head>
        <title>About Us | Linen A</title>
        <meta name='description' content='Magic Linen' />
      </Head>
      <Layout>
        <Box>
          <Breadcrumb data={['Home', 'About LinenA']} />
          <AboutLinenA />
        </Box>
      </Layout>
    </>
  );
};

export default AboutUs;
