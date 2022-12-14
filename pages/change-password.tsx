import Head from 'next/head';
import React, { useState } from 'react';
import BtnShopNow from '../components/Global/BtnShopNow/BtnShopNow';
import { useRouter } from 'next/router';
import { ProfileLayout } from '../components/Global/Layout/ProfileLayout';
import * as G from '../styles/global.styled';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { AccountApi } from '../services/api/account';
import { Alert, Box, Snackbar } from '@mui/material';
import { GetServerSidePropsContext } from 'next';
import { getCookie } from '../services/cookies';

const validationSchema = yup.object({
  passwordOld: yup
    .string()
    .required('Password is required')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
  passwordRepeat: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

type Props = {};

const ChangePassword = (props: Props) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const formik = useFormik({
    initialValues: {
      passwordOld: '',
      password: '',
      passwordRepeat: '',
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
              oldPassword: values.passwordOld,
              password: values.password,
            },
            token
          );

          if (result) {
            setOpenSnackbar(true);
            setLoading(false);
            console.log(result);
            setTimeout(() => {
              router.push('/profile');
            }, 1000);
          } else {
            setError(true);
            setLoading(false);
          }
        }
      } catch (error) {
        setLoading(false);
        console.log('error: ', error);
      }
    },
  });
  return (
    <>
      <Head>
        <title>Profile | Linen A</title>
        <meta name='description' content='Magic Linen' />
      </Head>
      <ProfileLayout>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={openSnackbar}
          autoHideDuration={3000}
        >
          <Alert severity='success' sx={{ width: '100%' }}>
            Change password complete !
          </Alert>
        </Snackbar>
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ mb: '20px' }}>
            <G.LabelInput>Old Password</G.LabelInput>
            <G.Input
              type={'password'}
              widthFull
              id='passwordOld'
              name='passwordOld'
              value={formik.values.passwordOld}
              onChange={formik.handleChange}
            ></G.Input>
            {formik.touched.password && Boolean(formik.errors.password) && (
              <G.ErrorText>{formik.errors.password}</G.ErrorText>
            )}
          </Box>
          <Box sx={{ mb: '20px' }}>
            <G.LabelInput>New Password</G.LabelInput>
            <G.Input
              type={'password'}
              widthFull
              id='password'
              name='password'
              value={formik.values.password}
              onChange={formik.handleChange}
            ></G.Input>
            {formik.touched.password && Boolean(formik.errors.password) && (
              <G.ErrorText>{formik.errors.password}</G.ErrorText>
            )}
          </Box>
          <Box sx={{ mb: '20px' }}>
            <G.LabelInput>Repeat Password</G.LabelInput>
            <G.Input
              type={'password'}
              widthFull
              id='passwordRepeat'
              name='passwordRepeat'
              value={formik.values.passwordRepeat}
              onChange={formik.handleChange}
            ></G.Input>
            {formik.touched.passwordRepeat &&
              Boolean(formik.errors.passwordRepeat) && (
                <G.ErrorText>{formik.errors.passwordRepeat}</G.ErrorText>
              )}
          </Box>

          <BtnShopNow
            title='Submit'
            type='submit'
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

export default ChangePassword;
