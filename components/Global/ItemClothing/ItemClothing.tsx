import Image from 'next/image';
import React from 'react';
import * as S from './ItemClothing.styled';
import clothing1 from '../../../assets/images/clothing1.jpg';

type Props = {};

const ItemClothing = (props: Props) => {
  return (
    <S.ItemClothing>
      <S.WrapImage>
        <Image src={clothing1} alt='' width={260} height={400} />
      </S.WrapImage>
      <S.Text>Color-block linen dress ADRIA in white-gray</S.Text>
      <S.WrapColor>
        <S.Color></S.Color>
        <S.ColorBlue></S.ColorBlue>
      </S.WrapColor>
      <S.WrapPrice>
        <S.TextPrice>$89.00</S.TextPrice>
      </S.WrapPrice>
    </S.ItemClothing>
  );
};

export default ItemClothing;
