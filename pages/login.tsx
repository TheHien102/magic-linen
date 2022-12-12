import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import React from 'react';
import { Layout } from '../components/Global/Layout/Layout';
import LoginUser from '../components/Login/Login';
import { getCookie } from '../services/cookies';

type Props = {};

const Login = (props: Props) => {
  return (
    <>
      <Head>
        <title>Login | Linen A</title>
        <meta name='description' content='Magic Linen' />
      </Head>
      <Layout>
        <LoginUser />
      </Layout>
    </>
  );
};

export default Login;
