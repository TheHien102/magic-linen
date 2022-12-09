import styled from 'styled-components';
import tw from 'twin.macro';

export const BannerSwiper = styled.div`
  ${tw`mx-[-150px] mb-10`}

  .swiper {
    ${tw`w-full h-full`}
  }

  .mySwiper {
    ${tw`h-[535px]`}

    .swiper-pagination-bullet {
      width: 9px;
      height: 9px;
      text-align: center;
      line-height: 20px;
      font-size: 12px;
      color: #000;
      opacity: 1;
      background: white;
      margin: 0 10px;
    }

    .swiper-pagination-bullet-active {
      color: #fff;
      position: relative;

      .content {
        position: absolute;
        top: -4px;
        left: -4px;
        border-radius: 100%;
        display: block;
        width: 17px;
        height: 17px;
        border: 1px solid white;
      }
    }
  }
`;

export const Company = styled.div`
  ${tw``}
`;

export const InnerBanner = styled.div`
  ${tw`relative`}
`;

export const WrapContent = styled.div`
  ${tw`flex px-14 max-w-[480px] justify-center items-center absolute right-0 top-0 h-[90%] mt-6 mr-6 bg-[hsla(0,0%,100%,.82)]`}
`;

export const Center = styled.div`
  ${tw``}
`;

export const WrapBtn = styled.div`
  ${tw`mt-16 mx-auto w-fit`}
`;

export const Title = styled.h1`
  ${tw`font-normal mb-1 text-center`}

  &:after {
    content: '';
    width: 48px;
    height: 2px;
    background-color: #000;
    display: block;
    margin: 0 auto;
  }
`;

export const SubTitle = styled.p`
  ${tw`text-[22px]  font-light leading-8 text-center tracking-wide`}
`;
