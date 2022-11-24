import { useRouter } from 'next/router';
import React from 'react';
import * as G from '../../styles/global.styled';
import Breadcrumb from '../Global/Breadcumb/Breadcumb';
import BtnShopNow from '../Global/BtnShopNow/BtnShopNow';
import HeaderTitle from '../Global/HeaderTitle/HeaderTitle';
import * as S from './Login.styled';

type Props = {};

const LoginUser = (props: Props) => {
  const router = useRouter();

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
          <S.Title>Existing customer</S.Title>
          <G.LabelInput>E-MAIL ADDRESS</G.LabelInput>
          <G.Input widthFull placeholder='E-Mail Address'></G.Input>
          <S.WrapInput>
            <G.LabelInput>PASSWORD</G.LabelInput>
            <G.Input widthFull placeholder='Password'></G.Input>
          </S.WrapInput>
          <BtnShopNow revertColor title='login' widthFull />
        </S.ColRight>
      </S.Flex>
    </S.Login>
  );
};

export default LoginUser;
