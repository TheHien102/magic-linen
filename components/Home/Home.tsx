import React from 'react';
import SectionTitle from '../Global/SectionTitle/SectionTitle';
import * as G from '../../styles/global.styled';
import * as S from './Home.styled';
import ListCompany from './ListCompany/ListCompany';
import BannerSwiper from './BannerSwiper/BannerSwiper';
import ItemClothing from '../Global/ItemClothing/ItemClothing';
import { ProductParams } from '../../services/types';
import BtnShopNow from '../Global/BtnShopNow/BtnShopNow';

interface IHomeLinen {
  listProduct: ProductParams[];
}

const HomeLinen = ({ listProduct }: IHomeLinen) => {
  return (
    <G.Container>
      <BannerSwiper />
      <SectionTitle title='AS SEEN IN' />
      <ListCompany />
      <SectionTitle title='linen clothing' />
      <S.ListClothing>
        {listProduct &&
          listProduct.map((data) => <ItemClothing key={data.id} data={data} />)}
      </S.ListClothing>
      <S.Center>
        <BtnShopNow title='SHOP NOW' />
      </S.Center>
    </G.Container>
  );
};

export default HomeLinen;
