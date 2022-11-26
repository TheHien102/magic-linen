import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import * as S from './ProductSwiper.styled';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper';
import { Box } from '@mui/material';
import Image from 'next/image';

export default function ProductSwiper() {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <S.ProductSwiper>
      <Swiper
        loop={true}
        onSwiper={setThumbsSwiper}
        direction={'vertical'}
        spaceBetween={10}
        slidesPerView={4}
        navigation={true}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className='mySwiper'
      >
        <SwiperSlide>
          <Image
            src='https://res.cloudinary.com/vhg2901/image/upload/v1669383825/edsr08eyqbq3ymqe6a1r.jpg'
            alt=''
            width={12}
            height={15}
            layout='responsive'
            objectFit='cover'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src='https://res.cloudinary.com/vhg2901/image/upload/v1669383825/edsr08eyqbq3ymqe6a1r.jpg'
            alt=''
            width={12}
            height={15}
            layout='responsive'
            objectFit='contain'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src='https://res.cloudinary.com/vhg2901/image/upload/v1669383825/edsr08eyqbq3ymqe6a1r.jpg'
            alt=''
            width={12}
            height={15}
            layout='responsive'
            objectFit='contain'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src='https://res.cloudinary.com/vhg2901/image/upload/v1669383825/edsr08eyqbq3ymqe6a1r.jpg'
            alt=''
            width={12}
            height={15}
            layout='responsive'
            objectFit='contain'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src='https://res.cloudinary.com/vhg2901/image/upload/v1669383825/edsr08eyqbq3ymqe6a1r.jpg'
            alt=''
            width={12}
            height={15}
            layout='responsive'
            objectFit='contain'
          />
        </SwiperSlide>
      </Swiper>
      <Swiper
        loop={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className='mySwiper2'
      >
        <SwiperSlide>
          <Image
            src='https://res.cloudinary.com/vhg2901/image/upload/v1669383825/edsr08eyqbq3ymqe6a1r.jpg'
            alt=''
            width={8}
            height={12}
            layout='responsive'
            objectFit='cover'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src='https://res.cloudinary.com/vhg2901/image/upload/v1669383825/edsr08eyqbq3ymqe6a1r.jpg'
            alt=''
            width={8}
            height={12}
            layout='responsive'
            objectFit='cover'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src='https://res.cloudinary.com/vhg2901/image/upload/v1669383825/edsr08eyqbq3ymqe6a1r.jpg'
            alt=''
            width={8}
            height={12}
            layout='responsive'
            objectFit='cover'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src='https://res.cloudinary.com/vhg2901/image/upload/v1669383825/edsr08eyqbq3ymqe6a1r.jpg'
            alt=''
            width={8}
            height={12}
            layout='responsive'
            objectFit='cover'
          />
        </SwiperSlide>
      </Swiper>
    </S.ProductSwiper>
  );
}
