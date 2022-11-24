import React from 'react';
import * as S from './BtnShopNow.styled';

interface IBtnShopNow {
  revertColor?: boolean;
  title?: string;
  widthFull?: boolean;
  onClick?: () => void;
}

const BtnShopNow = ({
  revertColor,
  title,
  widthFull,
  onClick,
}: IBtnShopNow) => {
  return (
    <S.BtnShopNow
      revertColor={revertColor}
      widthFull={widthFull}
      onClick={onClick}
    >
      {title ? title : 'Shop now'}
    </S.BtnShopNow>
  );
};

export default BtnShopNow;
