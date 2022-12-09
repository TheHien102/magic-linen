import Head from 'next/head';
import React, { useState } from 'react';
import BtnShopNow from '../components/Global/BtnShopNow/BtnShopNow';
import { useRouter } from 'next/router';
import * as G from '../styles/global.styled';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { AccountApi } from '../services/api/account';
import { Alert, Box, Typography } from '@mui/material';
import { getCookie } from '../services/cookies';
import { Layout } from '../components/Global/Layout/Layout';
import HeaderTitle from '../components/Global/HeaderTitle/HeaderTitle';

const validationSchema = yup.object({
  email: yup.string().email().required('Email is required'),
});

const ResetPassword = () => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError(false);

      try {
        const result = await AccountApi.requestForgetPassword(values.email);
        if (result) {
          setLoading(false);
          console.log(result);
          router.push('/login');
        } else {
          setError(true);
          setLoading(false);
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
        <title>Reset Password | Magic Linen</title>
        <meta name='description' content='Magic Linen' />
      </Head>
      <Layout>
        <Box sx={{ marginX: '300px' }}>
          <HeaderTitle title='Password reset' />
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ marginY: '50px' }}>
              <Typography
                sx={{
                  fontFamily: 'Josefin Sans',
                  fontWeight: '300',
                  fontSize: '14px',
                  mb: 3,
                }}
              >
                Enter the e-mail address associated with your account. Click
                submit to have a password reset link e-mailed to you.
              </Typography>
              <G.LabelInput>E-MAIL ADDRESS</G.LabelInput>
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

            <BtnShopNow
              title='Continue'
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
        </Box>
      </Layout>
    </>
  );
};

// export async function getServerSideProps(ctx: GetServerSidePropsContext) {
//   const token = getCookie('token', ctx);

//   if (!token) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: '/login',
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// }

export default ResetPassword;
