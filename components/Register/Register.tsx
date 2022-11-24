import React from 'react';
import * as G from '../../styles/global.styled';
import Breadcrumb from '../Global/Breadcumb/Breadcumb';
import HeaderTitle from '../Global/HeaderTitle/HeaderTitle';
import * as S from './Register.styled';

type Props = {};

const RegisterUser = (props: Props) => {
  return (
    <S.Register>
      <Breadcrumb />
      <HeaderTitle title='Registration' />
    </S.Register>
  );
};

export default RegisterUser;
