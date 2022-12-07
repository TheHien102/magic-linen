import React from 'react';
import * as S from './HeaderTitle.styled';

interface IHeaderTitle {
  title: string;
  fontSize?: string;
}

const HeaderTitle = ({ title, fontSize }: IHeaderTitle) => {
  return <S.HeaderTitle fontSize={fontSize}>{title}</S.HeaderTitle>;
};

export default HeaderTitle;
