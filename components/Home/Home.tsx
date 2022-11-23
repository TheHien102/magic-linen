import React from 'react';
import SectionTitle from '../Global/SectionTitle/SectionTitle';
import * as G from '../../styles/global.styled';
import * as S from './Home.styled';
import ListCompany from './ListCompany/ListCompany';
import ListClothing from './ListClothing/ListClothing';
import BannerSwiper from './BannerSwiper/BannerSwiper';

type Props = {};

const HomeLinen = (props: Props) => {
  return (
    <G.Container>
      <BannerSwiper />
      <SectionTitle title='AS SEEN IN' />
      <ListCompany />
      <SectionTitle title='linen clothing' />
      <ListClothing />
      <S.Center>
        <S.BtnShopNow>Shop now</S.BtnShopNow>
      </S.Center>
    </G.Container>
  );
};

export default HomeLinen;
