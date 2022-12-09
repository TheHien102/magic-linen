import React from 'react';
import * as S from './Footer.styled';
import * as G from '../../../styles/global.styled';
import Image from 'next/image';
import Link from 'next/link';
import { Box, Typography } from '@mui/material';
import logo from '../../../assets/images/logo.jpg';
import iconFacebook from '../../../assets/images/icon-facebook.svg';

export const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#f2f2f2', mt: 8 }}>
      <G.Container>
        <Box
          sx={{
            display: 'flex',
            gap: 5,
            alignItems: 'center',
            borderBottom: '1px solid gray',
            paddingY: 5,
          }}
        >
          <Box sx={{ position: 'relative' }}>
            <Image src={logo} width={200} height={200} alt='logo' />
          </Box>
          <Box>
            <Typography sx={{ fontFamily: 'Josefin Sans', fontWeight: 'bold' }}>
              Address
            </Typography>
            <Typography sx={{ fontFamily: 'Josefin Sans' }}>
              2-8 Thao Dien Ward, Thao Dien, District 2, Ho Chi Minh City
            </Typography>
            <Typography
              sx={{ fontFamily: 'Josefin Sans', fontWeight: 'bold', mt: 3 }}
            >
              Phone
            </Typography>
            <Typography sx={{ fontFamily: 'Josefin Sans' }}>
              090 283 15 71
            </Typography>
            <Typography
              sx={{ fontFamily: 'Josefin Sans', fontWeight: 'bold', mt: 3 }}
            >
              Open - Close
            </Typography>
            <Typography sx={{ fontFamily: 'Josefin Sans' }}>
              08:00 - 20:00 Every Day
            </Typography>
          </Box>
          <Box>
            <Typography sx={{ fontFamily: 'Josefin Sans', fontWeight: 'bold' }}>
              NEWSLETTER
            </Typography>
            <Typography
              sx={{
                fontFamily: 'Josefin Sans',
                fontWeight: '300',
                mt: 2,
                mb: 2,
              }}
            >
              Sign up to our mailing list and be the first one to know our
              latest news and offers!
            </Typography>
            <Link href={'https://www.facebook.com/shopquanaolinen'} passHref>
              <a style={{ width: 'fit-content' }} target={'_blank'}>
                <Box sx={{ position: 'relative', width: 'fit-content' }}>
                  <Image src={iconFacebook} alt='iconFacebook' />
                </Box>
              </a>
            </Link>
          </Box>
        </Box>
        <Typography
          sx={{
            fontFamily: 'Josefin Sans',
            textAlign: 'center',
            fontWeight: '300',
            paddingY: 3,
          }}
        >
          COPYRIGHT © LINENA 2022. All rights reserved.
        </Typography>
      </G.Container>
    </Box>
  );
};
