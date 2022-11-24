import Head from 'next/head';
import React from 'react';
import { Layout } from '../components/Global/Layout/Layout';
import ProfileUser from '../components/Profile/Profile';

type Props = {};

const Profile = (props: Props) => {
  return (
    <>
      <Head>
        <title>Profile | Magic Linen</title>
        <meta name='description' content='Magic Linen' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        <ProfileUser />
      </Layout>
    </>
  );
};

export default Profile;
