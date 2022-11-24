import Head from 'next/head';
import React from 'react';
import { Layout } from '../components/Global/Layout/Layout';
import LoginUser from '../components/Login/Login';

type Props = {};

const Login = (props: Props) => {
  return (
    <>
      <Head>
        <title>Login | Magic Linen</title>
        <meta name='description' content='Magic Linen' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        <LoginUser />
      </Layout>
    </>
  );
};

export default Login;
