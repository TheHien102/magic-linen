import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import BtnShopNow from '../components/Global/BtnShopNow/BtnShopNow';
import { Layout } from '../components/Global/Layout/Layout';
import { ProfileLayout } from '../components/Global/Layout/ProfileLayout';
import ProfileUser from '../components/Profile/Profile';
import { getCookie } from '../services/cookies';

type Props = {};

const Profile = (props: Props) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Profile | Linen A</title>
        <meta name='description' content='Magic Linen' />
      </Head>
      <ProfileLayout>
        <p className='text-[14px] mb-14'>
          By creating an account you will be able to shop faster, stay up to
          date on your order status, and easily access your purchase history.
        </p>
        <BtnShopNow
          onClick={() => router.push('/')}
          title={'continue'}
          revertColor
          widthFull
        />
      </ProfileLayout>
    </>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const token = getCookie('token', ctx);

  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    };
  }

  return {
    props: {},
  };
}

export default Profile;
