import * as S from './Header.styled';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../assets/images/logo.svg';
import { useRouter } from 'next/router';
import { Badge } from '@mui/material';
import iconCart from '../../../assets/images/icon-cart.svg';
import { useEffect, useState } from 'react';

export const Header = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState<string>();
  // const logUser = async () => {
  //   const token = await getCookie('token');
  //   if (token) {
  //     const profile = await AccountApi.profile(token as string);
  //     setFullName(profile.data.fullName);
  //   } else {
  //     setFullName('');
  //   }
  //   console.log(userInfo);
  //   console.log(permissions);
  //   console.log(token);
  // };
  useEffect(() => {
    if (localStorage.getItem('userInfo')) {
      setFullName(
        JSON.parse(localStorage.getItem('userInfo') as string).fullName
      );
    } else {
      setFullName(undefined);
    }
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
            badgeContent={4}
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
