import styled from 'styled-components';
import tw from 'twin.macro';

export const ProductSwiper = styled.div`
  ${tw`flex`}

  .mySwiper {
    ${tw`h-[640px] w-[20%]`}

    .swiper-slide-thumb-active {
      border: 1.5px solid black;
    }

    .swiper-button-prev,
    .swiper-button-next {
      ${tw`bg-[#ebeae7] w-full h-6`}
    }

    .swiper-button-prev {
      top: 22px;
      left: 0;
    }

    .swiper-button-next {
      bottom: 0;
      top: auto;
      right: 0;
    }

    .swiper-button-prev::after,
    .swiper-button-next::after {
      transform: rotate(90deg);
      font-size: 14px;
      color: black;
    }
    // .swiper-button-next::after {
    //   transform: rotate(90deg);
    //   font-size: 14px;
    // }
  }

  .mySwiper2 {
    ${tw`h-[640px] w-[75%]`}
  }
`;
