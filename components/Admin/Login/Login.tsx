import React, { useState } from 'react';
import * as S from './Login.styled';
import { TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useRouter } from 'next/router';
import { AccountApi } from '../../../services/api/account';
import { getCookie, setCookie } from '../../../services/cookies';
import { GetServerSidePropsContext } from 'next';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Alert from '@mui/material/Alert';

const validationSchema = yup.object({
  username: yup.string().required('User name is required'),
  password: yup.string().required('Password is required'),
});

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError(false);
      try {
        const result = await AccountApi.loginAdmin(values);
        if (result.data && result.data.token) {
          setCookie('token', result.data.token);
          setLoading(false);
          router.push('/admin/dashboard');
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
    <S.Login>
      <S.Title>Admin Linen A</S.Title>
      <form onSubmit={formik.handleSubmit}>
        <S.Flex>
          <S.Wrap>
            <TextField
              id='username'
              label='Username'
              variant='outlined'
              size='small'
              name='username'
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
              id='password'
              label='Password'
              variant='outlined'
              size='small'
              type={'password'}
              name='password'
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <LoadingButton loading={loading} variant='contained' type='submit'>
              Login
            </LoadingButton>
            {error && (
              <Alert severity='error'>Wrong Password or Username</Alert>
            )}
          </S.Wrap>
        </S.Flex>
      </form>
    </S.Login>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const token = await getCookie('token', ctx);

  if (token) {
    return {
      redirect: {
        permanent: false,
        destination: '/admin/dashboard',
      },
    };
  } else {
    return {
      props: {},
    };
  }
}

export default Login;
