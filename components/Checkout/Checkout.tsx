import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import clothing1 from '../../assets/images/clothing1.jpg';

type Props = {};

const CheckoutCart = (props: Props) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ width: '60%' }}></Box>
      <Box sx={{ width: '35%', backgroundColor: '#f8f8f8', p: 2.7 }}>
        <Typography
          sx={{ fontWeight: 'bold', fontFamily: 'Josefin Sans', mb: 1.5 }}
        >
          CART
        </Typography>
        <Box
          sx={{
            borderTop: '1px solid hsla(48,8%,88%,.6)',
            borderBottom: '1px solid black',
            py: 3,
          }}
        >
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ position: 'relative', width: '90px', height: '115px' }}>
              <Image
                src={clothing1}
                alt=''
                width={'100%'}
                height={'100%'}
                layout='responsive'
                objectFit='contain'
                objectPosition={'left'}
              />
            </Box>
            <Box>
              <Typography sx={{ fontFamily: 'Josefin Sans' }}>
                Color-block linen dress ADRIA in white-gray
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Josefin Sans',
                  color: 'gray',
                  fontWeight: 'light',
                }}
              >
                Size : XS
              </Typography>
              <Typography
                sx={{ fontFamily: 'Josefin Sans', fontWeight: 'light' }}
              >
                1 x $86.00
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ marginLeft: 'auto', width: 'fit-content', mt: 4 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              sx={{
                fontWeight: '400',
                fontFamily: 'Josefin Sans',
                fontSize: '16px',
                textAlign: 'right',
              }}
            >
              Sub-Total:
            </Typography>
            <Typography
              sx={{
                fontWeight: '400',
                fontFamily: 'Josefin Sans',
                fontSize: '16px',
                ml: 25,
                textAlign: 'right',
              }}
            >
              $71.20
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mt: 1,
              justifyContent: 'space-between',
            }}
          >
            <Typography
              sx={{
                fontWeight: '400',
                fontFamily: 'Josefin Sans',
                fontSize: '16px',
                textAlign: 'right',
              }}
            >
              Shipping:
            </Typography>
            <Typography
              sx={{
                fontWeight: '400',
                fontFamily: 'Josefin Sans',
                fontSize: '16px',
                ml: 10,
                textAlign: 'right',
              }}
            >
              $5.00
            </Typography>
          </Box>
          <Box
            sx={{
              borderTop: '1px solid hsla(48,8%,88%,.6)',
              mt: 2,
              width: '100%',
            }}
          ></Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mt: 2,
              justifyContent: 'space-between',
            }}
          >
            <Typography
              sx={{
                fontWeight: 'bold',
                fontFamily: 'Josefin Sans',
                fontSize: '22px',
                textAlign: 'right',
              }}
            >
              Total:
            </Typography>
            <Typography
              sx={{
                fontWeight: 'bold',
                fontFamily: 'Josefin Sans',
                fontSize: '22px',
                ml: 10,
                textAlign: 'right',
              }}
            >
              $71.20
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CheckoutCart;
