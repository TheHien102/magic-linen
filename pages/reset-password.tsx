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
import { GetServerSidePropsContext } from 'next';

const validationSchema = yup.object({
  email: yup.string().email().required('Email is required'),
});

const newPassWordValidationSchema = yup.object({
  newPassword: yup
    .string()
    .required('Password is required')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
  otp: yup
    .string()
    .required()
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(4, 'Must be exactly 4 digits')
    .max(4, 'Must be exactly 4 digits'),
});

const ResetPassword = () => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [idHash, setIdHash] = useState<string>();

  const formikEmail = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError(false);
      console.log(values);

      try {
        const result = await AccountApi.requestForgetPassword(values.email);
        console.log(result);
        if (result) {
          setLoading(false);
          setIdHash(result.data?.idHash);
          // router.push('/login');
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

  //Formik use for set new password (already had isHash and otp)
  const formikNewPassword = useFormik({
    initialValues: {
      newPassword: '',
      otp: '',
    },
    validationSchema: newPassWordValidationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError(false);

      try {
        const result = await AccountApi.setNewPassword({
          idHash: idHash as string,
          newPassword: values.newPassword,
          otp: values.otp,
        });
        console.log(result);
        if (result) {
          setLoading(false);
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
          {!idHash ? (
            <form onSubmit={formikEmail.handleSubmit}>
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
                  value={formikEmail.values.email}
                  onChange={formikEmail.handleChange}
                ></G.Input>
                {formikEmail.touched.email &&
                  Boolean(formikEmail.errors.email) && (
                    <G.ErrorText>{formikEmail.errors.email}</G.ErrorText>
                  )}
              </Box>

              <BtnShopNow
                title='Continue'
                revertColor
                widthFull
                onClick={() => formikEmail.submitForm()}
              />
              {error && (
                <Alert severity='error' style={{ margin: '20px 0 0' }}>
                  Unhandled error
                </Alert>
              )}
            </form>
          ) : (
            <form onSubmit={formikNewPassword.handleSubmit}>
              <Box sx={{ marginY: '50px' }}>
                <Typography
                  sx={{
                    fontFamily: 'Josefin Sans',
                    fontWeight: '300',
                    fontSize: '14px',
                    mb: 3,
                  }}
                >
                  Enter the OTP and your new password then click submit to set
                  your new password
                </Typography>
                <Box sx={{ mb: '20px' }}>
                  <G.LabelInput>OTP</G.LabelInput>
                  <G.Input
                    widthFull
                    id='otp'
                    name='otp'
                    value={formikNewPassword.values.otp}
                    onChange={formikNewPassword.handleChange}
                  ></G.Input>
                  {formikNewPassword.touched.otp &&
                    Boolean(formikNewPassword.errors.otp) && (
                      <G.ErrorText>{formikNewPassword.errors.otp}</G.ErrorText>
                    )}
                </Box>
                <G.LabelInput>New Password</G.LabelInput>
                <G.Input
                  widthFull
                  id='newPassword'
                  name='newPassword'
                  value={formikNewPassword.values.newPassword}
                  onChange={formikNewPassword.handleChange}
                  type='password'
                ></G.Input>
                {formikNewPassword.touched.newPassword &&
                  Boolean(formikNewPassword.errors.newPassword) && (
                    <G.ErrorText>
                      {formikNewPassword.errors.newPassword}
                    </G.ErrorText>
                  )}
              </Box>

              <BtnShopNow
                title='Submit'
                revertColor
                widthFull
                onClick={() => formikNewPassword.submitForm()}
              />
              {error && (
                <Alert severity='error' style={{ margin: '20px 0 0' }}>
                  Unhandled error
                </Alert>
              )}
            </form>
          )}
        </Box>
      </Layout>
    </>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const token = getCookie('token', ctx);

  if (token) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  return {
    props: {},
  };
}

export default ResetPassword;
