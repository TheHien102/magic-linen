import React from 'react';
import * as S from './HeaderTitle.styled';

interface IHeaderTitle {
  title: string;
}

const HeaderTitle = ({ title }: IHeaderTitle) => {
  return <S.HeaderTitle>{title}</S.HeaderTitle>;
};

export default HeaderTitle;
