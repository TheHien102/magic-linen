import * as S from './ProfileLayout.styled';
import { Layout } from './Layout';
import HeaderTitle from '../HeaderTitle/HeaderTitle';
import Breadcrumb from '../Breadcumb/Breadcumb';
import { useRouter } from 'next/router';
import { AccountApi } from '../../../services/api/account';
import { getCookie, removeCookie } from '../../../services/cookies';

interface LayoutProps {
  children: React.ReactNode;
}

export const ProfileLayout = ({ children }: LayoutProps) => {
  const router = useRouter();

  const logOut = async () => {
    try {
      const token = await getCookie('token');
      const res = await AccountApi.logout(token as string);
      if (res) {
        localStorage.removeItem('userInfo');
        await removeCookie('token');
        router.push('/login');
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Layout>
      <S.Profile>
        <Breadcrumb />
        <HeaderTitle title='My Account' />
        <S.Flex>
          <S.ColLeft>
            <S.BtnWrap onClick={() => logOut()}>Logout</S.BtnWrap>
            <S.BtnWrap onClick={() => router.push('/change-password')}>
              Password
            </S.BtnWrap>
            <S.BtnWrap onClick={() => router.push('/account-information')}>
              Account Information
            </S.BtnWrap>
          </S.ColLeft>
          <S.ColRight>{children}</S.ColRight>
        </S.Flex>
      </S.Profile>
    </Layout>
  );
};
