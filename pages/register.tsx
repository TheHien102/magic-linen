import Head from 'next/head';
import React from 'react';
import { Layout } from '../components/Global/Layout/Layout';
import RegisterUser from '../components/Register/Register';

type Props = {};

const Register = (props: Props) => {
  return (
    <>
      <Head>
        <title>Register | Magic Linen</title>
        <meta name='description' content='Magic Linen' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        <RegisterUser />
      </Layout>
    </>
  );
};

export default Register;
