import { Box } from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import CheckoutCart from '../components/Checkout/Checkout';
import HeaderTitle from '../components/Global/HeaderTitle/HeaderTitle';
import * as G from '../styles/global.styled';
import logo from '../assets/images/logo.svg';

type Props = {};

const Checkout = (props: Props) => {
  return (
    <>
      <Head>
        <title>Checkout | Magic Linen</title>
        <meta name='description' content='Magic Linen' />
      </Head>
      <G.Container>
        <Box sx={{ marginX: '130px' }}>
          <Box sx={{ marginX: 'auto', width: 'fit-content', mt: 5 }}>
            <Image src={logo} alt='logo' width={170} height={100} />
          </Box>
          <HeaderTitle title='Secure Checkout' />
          <CheckoutCart />
        </Box>
      </G.Container>
    </>
  );
};

export default Checkout;
