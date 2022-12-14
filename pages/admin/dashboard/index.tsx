import { GetServerSidePropsContext } from 'next';
import React from 'react';
import { getCookie } from '../../../services/cookies';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Head from 'next/head';
import Layout from '../../../components/Admin/LayoutAdmin/LayoutAdmin';
import logo from '../../../assets/images/logo.jpg';
import Image from 'next/image';

const Dashboard = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name='description' content='Generated by create next app' />
      </Head>
      <Layout>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Typography
            sx={{
              fontWeight: 'bold',
              fontSize: '36px',
              fontFamily: 'Josefin Sans',
            }}
          >
            Welcome to admin page of Linen A
          </Typography>
          <Typography sx={{ fontSize: '28px', fontFamily: 'Josefin Sans' }}>
            Select what you want to do on side navigation
          </Typography>
          <Box>
            <Image width={500} height={500} src={logo} alt='logo' />
          </Box>
        </Box>
      </Layout>
    </>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const token = await getCookie('token', ctx);

  if (token) {
    try {
    } catch (e) {}

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

export default Dashboard;
