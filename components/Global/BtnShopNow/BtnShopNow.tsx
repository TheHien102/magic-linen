import React from 'react';
import * as S from './BtnShopNow.styled';

interface IBtnShopNow {
  revertColor?: boolean;
  title?: string;
  widthFull?: boolean;
  type?: 'submit' | 'reset' | 'button';
  onClick?: () => void;
}

const BtnShopNow = ({
  revertColor,
  title,
  widthFull,
  onClick,
  type,
}: IBtnShopNow) => {
  return (
    <S.BtnShopNow
      revertColor={revertColor}
      widthFull={widthFull}
      onClick={onClick}
      type={type}
    >
      {title ? title : 'Shop now'}
    </S.BtnShopNow>
  );
};

export default BtnShopNow;
