import Image from 'next/image';
import React from 'react';
import * as S from './ItemClothing.styled';
import { ProductParams } from '../../../services/types';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import { formatPrice } from '../../../utils/common';

interface IItemClothing {
  data: ProductParams;
}

const ItemClothing = ({ data }: IItemClothing) => {
  return (
    <S.ItemClothing>
      <S.WrapImage>
        <Link href={`/product/${data.id}`} passHref>
          <a>
            <Image
              src={data.mainImg}
              alt=''
              width={260}
              height={380}
              layout='responsive'
            />
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
        {data.discount === 0 ? (
          <Typography
            sx={{
              fontFamily: 'Josefin Sans',
              ml: 1,
              fontSize: '24px',
              fontWeight: 'bold',
              lineHeight: '1',
            }}
          >
            {formatPrice(data.price)}
          </Typography>
        ) : (
          <>
            <Typography
              sx={{
                textDecoration: 'line-through',
                fontFamily: 'Josefin Sans',
                color: 'gray',
                fontSize: '14px',
                lineHeight: '1.3',
              }}
            >
              ${formatPrice(data.price)}
            </Typography>
            <Typography
              sx={{
                fontFamily: 'Josefin Sans',
                ml: 1,
                fontWeight: 'bold',
                color: '#9e1a1a',
                lineHeight: '1',
              }}
            >
              ${formatPrice(data.price * ((100 - data.discount) / 100))}
            </Typography>
          </>
        )}
      </S.WrapPrice>
    </S.ItemClothing>
  );
};

export default ItemClothing;
