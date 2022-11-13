import React from 'react';
import * as S from './Login.styled';
import { TextField, Button } from '@mui/material';
import { useRouter } from 'next/router';
import { AccountApi } from '../../../services/api/account';
import { getCookie, setCookie } from '../../../services/cookies';
import { GetServerSidePropsContext } from 'next';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  username: yup.string().required('User name is required'),
  password: yup.string().required('Password is required'),
});

const Login = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const result = await AccountApi.loginAdmin(values);
        if (result.data && result.data.token) {
          setCookie('token', result.data.token);
          console.log('data login: ', result.data);
          router.push('/admin/dashboard');
        }
      } catch (error) {
        console.log(error);
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
            <Button variant='contained' type='submit'>
              Login
            </Button>
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
