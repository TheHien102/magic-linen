import Image from 'next/image';
import React from 'react';
import * as S from './ItemClothing.styled';
import { ProductParams } from '../../../services/types';
import { Box } from '@mui/material';
import Link from 'next/link';

interface IItemClothing {
  data: ProductParams;
}

const ItemClothing = ({ data }: IItemClothing) => {
  return (
    <S.ItemClothing>
      <S.WrapImage>
        <Link href={`/product/${data.id}`} passHref>
          <a>
            <Image src={data.mainImg} alt='' width={260} height={400} />
          </a>
        </Link>
      </S.WrapImage>
      <Link href={`/product/${data.id}`}>
        <S.Text>{data.name}</S.Text>
      </Link>
      <S.WrapColor>
        {data.variants &&
          data.variants.map((data) => (
            <Box
              key={data.id}
              sx={{
                width: 20,
                height: 20,
                border: '2px solid gray',
                borderRadius: '100%',
                bgcolor: data.property,
              }}
            ></Box>
          ))}
      </S.WrapColor>
      <S.WrapPrice>
        <S.TextPrice>{'$' + data.price}</S.TextPrice>
      </S.WrapPrice>
    </S.ItemClothing>
  );
};

export default ItemClothing;
