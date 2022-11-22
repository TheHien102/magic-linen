import React from 'react';
import ItemClothing from '../../Global/ItemClothing/ItemClothing';
import * as S from './ListClothing.styled';

type Props = {};

const ListClothing = (props: Props) => {
  return (
    <S.ListClothing>
      <ItemClothing />
      <ItemClothing />
      <ItemClothing />
      <ItemClothing />
    </S.ListClothing>
  );
};

export default ListClothing;
