import React from 'react';
import * as G from '../../styles/global.styled';
import Breadcrumb from '../Global/Breadcumb/Breadcumb';
import BtnShopNow from '../Global/BtnShopNow/BtnShopNow';
import HeaderTitle from '../Global/HeaderTitle/HeaderTitle';
import * as S from './Register.styled';

type Props = {};

const RegisterUser = (props: Props) => {
  return (
    <S.Register>
      <Breadcrumb />
      <HeaderTitle title='Registration' />
      <S.WrapInput>
        <S.Col1>
          <S.Flex>
            <G.LabelInput>Username</G.LabelInput>
            <G.Input placeholder='Username'></G.Input>
          </S.Flex>
          <S.MarginTop>
            <S.Flex>
              <G.LabelInput>Password</G.LabelInput>
              <G.Input placeholder='Password' type={'password'}></G.Input>
            </S.Flex>
          </S.MarginTop>
        </S.Col1>
        <S.Col1>
          <S.Flex>
            <G.LabelInput>Email</G.LabelInput>
            <G.Input placeholder='Email'></G.Input>
          </S.Flex>
          <S.MarginTop>
            <S.Flex>
              <G.LabelInput>Full name</G.LabelInput>
              <G.Input placeholder='Full name'></G.Input>
            </S.Flex>
          </S.MarginTop>
          <S.MarginTop>
            <S.Flex>
              <G.LabelInput>Phone</G.LabelInput>
              <G.Input placeholder='Phone'></G.Input>
            </S.Flex>
          </S.MarginTop>
          <S.WrapBtn>
            <BtnShopNow title='continue' revertColor widthFull />
          </S.WrapBtn>
        </S.Col1>
      </S.WrapInput>
    </S.Register>
  );
};

export default RegisterUser;
