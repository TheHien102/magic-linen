import { Box, Typography } from '@mui/material';
import React from 'react';
import Image from 'next/image';
import { CartItemParams } from '../../services/types';
import { formatPrice } from '../../utils/common';

interface IItemCart {
  data: CartItemParams;
}

const ItemCart = ({ data }: IItemCart) => {
  return (
    <Box
      sx={{
        display: 'flex',
        borderBottom: '1px solid hsla(48,8%,88%,.6)',
        mb: 2,
        pb: 1,
        '&:last-child': { borderBottom: 0, mb: 0, pb: 0 },
      }}
    >
      <Box sx={{ position: 'relative', width: '90px', height: '115px' }}>
        <Image
          src={data.mainImg}
          alt=''
          width={'100%'}
          height={'100%'}
          layout='responsive'
          objectFit='contain'
          objectPosition={'left'}
        />
      </Box>
      <Box>
        <Typography sx={{ fontFamily: 'Josefin Sans' }}>{data.name}</Typography>
        {data.variants &&
          data.variants.map((_data) =>
            _data.name === 'color' ? (
              <Box
                key={_data.id}
                sx={{
                  fontFamily: 'Josefin Sans',
                  fontSize: '14px',
                  color: 'gray',
                  textTransform: 'capitalize',
                }}
              >
                {_data.name} :{' '}
                <Box
                  sx={{
                    display: 'inline-block',
                    width: 15,
                    height: 15,
                    border: '1px solid gray',
                    backgroundColor: _data.property,
                  }}
                ></Box>
              </Box>
            ) : (
              <Typography
                key={_data.id}
                sx={{
                  fontFamily: 'Josefin Sans',
                  fontSize: '14px',
                  color: 'gray',
                  textTransform: 'capitalize',
                }}
              >
                {_data.name} : {_data.property}
              </Typography>
            )
          )}
        <Typography sx={{ fontFamily: 'Josefin Sans', fontWeight: 'light' }}>
          {data.quantity} x ${formatPrice(data.price)}
        </Typography>
      </Box>
    </Box>
  );
};

export default ItemCart;
