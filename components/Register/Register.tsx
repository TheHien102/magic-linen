import React, { useState } from 'react';
import * as G from '../../styles/global.styled';
import Breadcrumb from '../Global/Breadcumb/Breadcumb';
import BtnShopNow from '../Global/BtnShopNow/BtnShopNow';
import HeaderTitle from '../Global/HeaderTitle/HeaderTitle';
import * as S from './Register.styled';
import { AccountApi } from '../../services/api/account';
import * as yup from 'yup';
import Alert from '@mui/material/Alert';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';

type Props = {};

const validationSchema = yup.object({
  username: yup.string().required('User name is required'),
  email: yup.string().required('Email is required'),
  password: yup.string().required('Password is required'),
  fullName: yup.string().required('Full name is required'),
  phone: yup.string().required('Phone is required'),
});

const RegisterUser = (props: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      fullName: '',
      phone: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError(false);

      try {
        const result = await AccountApi.register(values);

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
    <S.Register>
      <Breadcrumb />
      <HeaderTitle title='Registration' />
      <form onSubmit={formik.handleSubmit}>
        <S.WrapInput>
          <S.Col1>
            <S.Flex>
              <G.LabelInput>Username</G.LabelInput>
              <G.Input
                placeholder='Username'
                widthFull
                id='username'
                name='username'
                value={formik.values.username}
                onChange={formik.handleChange}
              ></G.Input>
            </S.Flex>
            <S.MarginTop>
              <S.Flex>
                <G.LabelInput>Password</G.LabelInput>
                <G.Input
                  placeholder='Password'
                  type={'password'}
                  widthFull
                  id='password'
                  name='password'
                  value={formik.values.password}
                  onChange={formik.handleChange}
                ></G.Input>
              </S.Flex>
            </S.MarginTop>
          </S.Col1>
          <S.Col1>
            <S.Flex>
              <G.LabelInput>Email</G.LabelInput>
              <G.Input
                placeholder='Email'
                widthFull
                id='email'
                name='email'
                value={formik.values.email}
                onChange={formik.handleChange}
              ></G.Input>
            </S.Flex>
            <S.MarginTop>
              <S.Flex>
                <G.LabelInput>Full name</G.LabelInput>
                <G.Input
                  placeholder='Full name'
                  widthFull
                  id='fullName'
                  name='fullName'
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                ></G.Input>
              </S.Flex>
            </S.MarginTop>
            <S.MarginTop>
              <S.Flex>
                <G.LabelInput>Phone</G.LabelInput>
                <G.Input
                  placeholder='Phone'
                  widthFull
                  id='phone'
                  name='phone'
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                ></G.Input>
              </S.Flex>
            </S.MarginTop>
            <S.WrapBtn>
              <BtnShopNow
                title='continue'
                revertColor
                widthFull
                onClick={() => formik.submitForm()}
              />
            </S.WrapBtn>
          </S.Col1>
        </S.WrapInput>
        {error && (
          <Alert severity='error' style={{ margin: '20px 0 0' }}>
            Unhandled error
          </Alert>
        )}
      </form>
    </S.Register>
  );
};

export default RegisterUser;
