import * as S from './Header.styled';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../assets/images/logo.svg';
import { useRouter } from 'next/router';
import { Badge } from '@mui/material';
import { useStorageContext } from '../../../contexts/StorageContext';
import { getCookie } from '../../../services/cookies';
import iconCart from '../../../assets/images/icon-cart.svg';

export const Header = () => {
  const router = useRouter();
  const { userInfo, setUserInfo } = useStorageContext();

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
          {!userInfo ? (
            <Link href={'/login'}>
              <S.BtnLogin>sign in</S.BtnLogin>
            </Link>
          ) : (
            <Link href={'/profile'}>
              <S.BtnLogin>{userInfo?.fullName}</S.BtnLogin>
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
        <Link href={'/'}>
          <S.Text>Women clothing</S.Text>
        </Link>
        <Link href={'/'}>
          <S.Text>Men clothing</S.Text>
        </Link>
      </S.Navbar>
    </S.Header>
  );
};
