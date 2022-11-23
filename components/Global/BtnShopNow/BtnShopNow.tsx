import React from 'react';
import * as S from './BtnShopNow.styled';

interface IBtnShopNow {
  revertColor?: boolean;
}

const BtnShopNow = ({ revertColor }: IBtnShopNow) => {
  return <S.BtnShopNow revertColor={revertColor}>Shop now</S.BtnShopNow>;
};

export default BtnShopNow;
