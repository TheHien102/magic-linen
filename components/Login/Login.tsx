import { useRouter } from 'next/router';
import React, { useState } from 'react';
import * as G from '../../styles/global.styled';
import * as S from './Login.styled';
import Breadcrumb from '../Global/Breadcumb/Breadcumb';
import BtnShopNow from '../Global/BtnShopNow/BtnShopNow';
import HeaderTitle from '../Global/HeaderTitle/HeaderTitle';
import { Field, useFormik } from 'formik';
import { AccountApi } from '../../services/api/account';
import * as yup from 'yup';
import { getCookie, setCookie } from '../../services/cookies';
import Alert from '@mui/material/Alert';
import { useStorageContext } from '../../contexts/StorageContext';
import Link from 'next/link';
import { Box, Typography } from '@mui/material';

type Props = {};

const validationSchema = yup.object({
  username: yup.string().required('Email is required'),
  password: yup.string().required('Password is required'),
});

const LoginUser = (props: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { userInfo, setUserInfo } = useStorageContext();

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
          setUserInfo &&
            setUserInfo({
              fullName: result.data.fullName,
              avatarPath: result.data.avatarPath,
            });
          router.push('/');
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
      <Breadcrumb />
      <HeaderTitle title='My Account' />
      <S.Flex>
        <S.ColLeft>
          <S.Title>New customer</S.Title>
          <S.Content>
            By creating an account you will be able to shop faster, stay up to
            date on your order status, and easily access your purchase history.
          </S.Content>
          <BtnShopNow
            onClick={() => router.push('/register')}
            title={'continue'}
            revertColor
            widthFull
          />
        </S.ColLeft>
        <S.MiddleLine />
        <S.ColRight>
          <form onSubmit={formik.handleSubmit}>
            <S.Title>Existing customer</S.Title>
            <G.LabelInput>USERNAME</G.LabelInput>
            <G.Input
              widthFull
              placeholder='UserName'
              id='username'
              name='username'
              value={formik.values.username}
              onChange={formik.handleChange}
            />
            {formik.touched.username && Boolean(formik.errors.username) && (
              <G.ErrorText>{formik.errors.username}</G.ErrorText>
            )}
            <S.WrapInput>
              <G.LabelInput>PASSWORD</G.LabelInput>
              <G.Input
                widthFull
                placeholder='Password'
                id='password'
                type={'password'}
                name='password'
                value={formik.values.password}
                onChange={formik.handleChange}
              ></G.Input>
              {formik.touched.password && Boolean(formik.errors.password) && (
                <G.ErrorText>{formik.errors.password}</G.ErrorText>
              )}
            </S.WrapInput>
            <BtnShopNow
              revertColor
              title='login'
              widthFull
              onClick={() => formik.submitForm()}
            />
            {error && (
              <Alert severity='error' style={{ margin: '20px 0 0' }}>
                Wrong Password or Username
              </Alert>
            )}
          </form>

          <S.ResetText>
            Forgot your password?
            <Link href='/reset-password'>
              <Typography
                sx={{
                  ml: '10px',
                  display: 'inline-block',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 'bold',
                }}
              >
                Reset it
              </Typography>
            </Link>
          </S.ResetText>
        </S.ColRight>
      </S.Flex>
    </S.Login>
  );
};

export default LoginUser;
