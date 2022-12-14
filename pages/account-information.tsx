import Head from 'next/head';
import React, { useState } from 'react';
import BtnShopNow from '../components/Global/BtnShopNow/BtnShopNow';
import { useRouter } from 'next/router';
import { ProfileLayout } from '../components/Global/Layout/ProfileLayout';
import * as G from '../styles/global.styled';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { AccountApi } from '../services/api/account';
import { Alert, Box } from '@mui/material';
import { GetServerSidePropsContext } from 'next';
import { getCookie } from '../services/cookies';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = yup.object({
  username: yup.string(),
  email: yup.string().email(),
  fullName: yup.string(),
  phone: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
});

interface AccountInformationProps {
  username: string;
  phone: string;
  fullName: string;
  email: string;
}

const AccountInformation = ({
  username,
  phone,
  fullName,
  email,
}: AccountInformationProps) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: username,
      fullName: fullName,
      email: email,
      phone: phone,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError(false);

      try {
        const token = await getCookie('token');
        if (token) {
          const result = await AccountApi.updateProfileUser(
            {
              username: values.username,
              fullName: values.fullName,
              email: values.email,
              phone: values.phone,
            },
            token
          );

          if (result) {
            setLoading(false);
            localStorage.setItem(
              'userInfo',
              JSON.stringify({
                fullName: values.fullName,
                avatarPath: '',
                phone: values.phone,
                address: '',
              })
            );
            router.push('/profile');
            console.log(result);
          } else {
            setError(true);
            setLoading(false);
          }
        }
      } catch (error) {
        setError(true);
        setLoading(false);
        console.log('error: ', error);
      }
    },
  });
  return (
    <>
      <Head>
        <title>Profile | Magic Linen</title>
        <meta name='description' content='Magic Linen' />
      </Head>
      <ProfileLayout>
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ mb: '20px' }}>
            <G.LabelInput>Username</G.LabelInput>
            <G.Input
              widthFull
              id='username'
              name='username'
              value={formik.values.username}
              onChange={formik.handleChange}
            ></G.Input>
            {formik.touched.username && Boolean(formik.errors.username) && (
              <G.ErrorText>{formik.errors.username}</G.ErrorText>
            )}
          </Box>
          <Box sx={{ mb: '20px' }}>
            <G.LabelInput>Full Name</G.LabelInput>
            <G.Input
              widthFull
              id='fullName'
              name='fullName'
              value={formik.values.fullName}
              onChange={formik.handleChange}
            ></G.Input>
            {formik.touched.fullName && Boolean(formik.errors.fullName) && (
              <G.ErrorText>{formik.errors.fullName}</G.ErrorText>
            )}
          </Box>
          <Box sx={{ mb: '20px' }}>
            <G.LabelInput>Email</G.LabelInput>
            <G.Input
              widthFull
              id='email'
              name='email'
              value={formik.values.email}
              onChange={formik.handleChange}
            ></G.Input>
            {formik.touched.email && Boolean(formik.errors.email) && (
              <G.ErrorText>{formik.errors.email}</G.ErrorText>
            )}
          </Box>
          <Box sx={{ mb: '20px' }}>
            <G.LabelInput>Phone</G.LabelInput>
            <G.Input
              widthFull
              id='phone'
              name='phone'
              value={formik.values.phone}
              onChange={formik.handleChange}
            ></G.Input>
            {formik.touched.phone && Boolean(formik.errors.phone) && (
              <G.ErrorText>{formik.errors.phone}</G.ErrorText>
            )}
          </Box>

          <BtnShopNow
            title='Submit'
            revertColor
            widthFull
            onClick={() => formik.submitForm()}
          />
          {error && (
            <Alert severity='error' style={{ margin: '20px 0 0' }}>
              Unhandled error
            </Alert>
          )}
        </form>
      </ProfileLayout>
    </>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const token = getCookie('token', ctx);

  const [profile] = await Promise.all([AccountApi.profile(token as string)]);
  console.log(profile);

  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    };
  }

  return {
    props: {
      username: profile.data.username,
      email: profile.data.email,
      fullName: profile.data.fullName,
      phone: profile.data.phone,
    },
  };
}

export default AccountInformation;
