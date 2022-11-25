import { useRouter } from 'next/router';
import React from 'react';
import * as G from '../../styles/global.styled';
import Breadcrumb from '../Global/Breadcumb/Breadcumb';
import BtnShopNow from '../Global/BtnShopNow/BtnShopNow';
import HeaderTitle from '../Global/HeaderTitle/HeaderTitle';
import * as S from './Profile.styled';

type Props = {};

const ProfileUser = (props: Props) => {
  const router = useRouter();

  return (
    <S.Profile>
      <Breadcrumb />
      <HeaderTitle title='My Account' />
      <S.Flex>
        <S.ColLeft>
          <S.BtnWrap>Logout</S.BtnWrap>
        </S.ColLeft>
        <S.ColRight>
          <S.Content>
            By creating an account you will be able to shop faster, stay up to
            date on your order status, and easily access your purchase history.
          </S.Content>
          <BtnShopNow
            onClick={() => router.push('/')}
            title={'continue'}
            revertColor
            widthFull
          />
        </S.ColRight>
      </S.Flex>
    </S.Profile>
  );
};

export default ProfileUser;
