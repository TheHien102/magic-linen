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

interface IProductSwiper {
  data: string[];
}

export default function ProductSwiper({ data }: IProductSwiper) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <S.ProductSwiper>
      <Swiper
        // loop={true}
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
        {data.map((_data, index) => (
          <SwiperSlide key={index}>
            <Box sx={{ position: 'relative', cursor: 'pointer' }}>
              <Image
                src={_data}
                alt=''
                width={12}
                height={16.3}
                layout='responsive'
                // objectFit='cover'
                // layout='fill'
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        loop={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className='mySwiper2'
      >
        {data.map((_data, index) => (
          <SwiperSlide key={index}>
            <Image
              src={_data}
              alt=''
              width={8}
              height={12}
              layout='responsive'
              objectFit='cover'
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </S.ProductSwiper>
  );
}
