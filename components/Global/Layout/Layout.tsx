import {Header} from "../Header/Header";
import {Footer} from "../Footer/Footer";
import * as S from "./Layout.styled";

interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout = (props: LayoutProps) => {
  return (
    <S.Layout>
      <S.LayoutInner>
        <Header />
        {props.children}
      </S.LayoutInner>
      <Footer />
    </S.Layout>
  );
};
