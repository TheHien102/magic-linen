import * as S from './Header.styled';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../assets/images/logo.svg';
import { useRouter } from 'next/router';
import { Badge } from '@mui/material';
import iconCart from '../../../assets/images/icon-cart.svg';
import { useEffect, useState } from 'react';
import { CartApi } from '../../../services/api/cart';
import { getCookie } from '../../../services/cookies';

export const Header = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState<string>();
  const [cartCount, setCartCount] = useState<number>(0);

  useEffect(() => {
    if (localStorage.getItem('userInfo')) {
      setFullName(
        JSON.parse(localStorage.getItem('userInfo') as string).fullName
      );
    } else {
      setFullName(undefined);
    }
  }, []);

  const getListCart = async () => {
    const token = await getCookie('token');
    const _count = localStorage.getItem('cartCount');
    if (_count) {
      setCartCount(Number(_count));
    } else {
      if (token) {
        const res = await CartApi.listCart(token);
        setCartCount(res.data.totalElements);
      }
    }
  };

  useEffect(() => {
    getListCart();
  }, []);

  return (
    <S.Header>
      <S.Center>
        <S.WrapBtnLogin>
          <S.BtnLogin onClick={() => router.push('/about-us')}>
            Our Story
          </S.BtnLogin>
        </S.WrapBtnLogin>
        <Link href={'/'}>
          <S.WrapImage>
            <Image src={logo} alt='logo' />
          </S.WrapImage>
        </Link>
        <S.WrapBtnLogin>
          {!fullName ? (
            <Link href={'/login'}>
              <S.BtnLogin>sign in</S.BtnLogin>
            </Link>
          ) : (
            <Link href={'/profile'}>
              <S.BtnLogin>{fullName}</S.BtnLogin>
            </Link>
          )}
          <Badge
            badgeContent={cartCount}
            color='primary'
            sx={{ ml: 2, cursor: 'pointer' }}
            onClick={() => router.push('/cart')}
          >
            <Image src={iconCart} alt='iconCart' />
          </Badge>
        </S.WrapBtnLogin>
      </S.Center>
      <S.Navbar>
        <Link href={'/shop'}>
          <S.Text>Women clothing</S.Text>
        </Link>
        <Link href={'/shop'}>
          <S.Text>Men clothing</S.Text>
        </Link>
      </S.Navbar>
    </S.Header>
  );
};
