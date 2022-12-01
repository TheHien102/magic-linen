import * as S from './Header.styled';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../assets/images/logo.svg';

export const Header = () => {
  return (
    <S.Header>
      <S.Center>
        <Link href={'/'}>
          <S.WrapImage>
            <Image src={logo} alt='logo' />
          </S.WrapImage>
        </Link>
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
