import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import * as S from './BannerSwiper.styled';
import banner1 from '../../../assets/images/banner1.jpg';
import banner2 from '../../../assets/images/banner2.jpg';
import banner3 from '../../../assets/images/banner3.jpg';
import banner4 from '../../../assets/images/banner4.jpg';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// import required modules
import { Pagination, Autoplay, EffectFade } from 'swiper';
import Image from 'next/image';
import BtnShopNow from '../../Global/BtnShopNow/BtnShopNow';

export default function BannerSwiper() {
  const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return (
        '<span class="' +
        className +
        '">' +
        '<span class="content">' +
        '</span>' +
        '</span>'
      );
    },
  };

  return (
    <S.BannerSwiper>
      <Swiper
        pagination={pagination}
        effect={'fade'}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay, EffectFade]}
        className='mySwiper'
      >
        <SwiperSlide>
          <S.InnerBanner>
            <Image src={banner1} alt='banner1' />
          </S.InnerBanner>
          <S.WrapContent>
            <S.Center>
              <S.Title>BLACK FRIDAY SALE</S.Title>
              <S.SubTitle>
                Shop our best offer of the year - valid for limited time only!
              </S.SubTitle>
              <S.WrapBtn>
                <BtnShopNow revertColor={true} />
              </S.WrapBtn>
            </S.Center>
          </S.WrapContent>
        </SwiperSlide>
        <SwiperSlide>
          <S.InnerBanner>
            <Image src={banner2} alt='banner1' />
          </S.InnerBanner>
          <S.WrapContent>
            <S.Center>
              <S.Title>HOLIDAY GIFT GUIDE</S.Title>
              <S.SubTitle>
                Shop handmade linen gifts. Free Express Shipping to USA on
                orders over $150
              </S.SubTitle>
              <S.WrapBtn>
                <BtnShopNow revertColor={true} />
              </S.WrapBtn>
            </S.Center>
          </S.WrapContent>
        </SwiperSlide>
        <SwiperSlide>
          <S.InnerBanner>
            <Image src={banner3} alt='banner1' />
          </S.InnerBanner>
          <S.WrapContent>
            <S.Center>
              <S.Title>FESTIVE CHRISTMAS DEALS</S.Title>
              <S.SubTitle>Shop handmade gifts with up to 50% off</S.SubTitle>
              <S.WrapBtn>
                <BtnShopNow revertColor={true} />
              </S.WrapBtn>
            </S.Center>
          </S.WrapContent>
        </SwiperSlide>
        <SwiperSlide>
          <S.InnerBanner>
            <Image src={banner4} alt='banner1' />
          </S.InnerBanner>
          <S.WrapContent>
            <S.Center>
              <S.Title>SWEET DREAMS</S.Title>
              <S.SubTitle>
                Sleep well this cozy season with handmade linen bedding
              </S.SubTitle>
              <S.WrapBtn>
                <BtnShopNow revertColor={true} />
              </S.WrapBtn>
            </S.Center>
          </S.WrapContent>
        </SwiperSlide>
      </Swiper>
    </S.BannerSwiper>
  );
}
