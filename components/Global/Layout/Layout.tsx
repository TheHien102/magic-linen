import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import * as S from './Layout.styled';
import * as G from '../../../styles/global.styled';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = (props: LayoutProps) => {
  return (
    <S.Layout>
      <G.Container>
        <S.LayoutInner>
          <Header />
          {props.children}
        </S.LayoutInner>
      </G.Container>
      <Footer />
    </S.Layout>
  );
};
