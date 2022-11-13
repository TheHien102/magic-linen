import styled from 'styled-components';
import tw from 'twin.macro';

export const Footer = styled.div`
  ${tw`bg-green`}
`;

export const FooterAbove = styled.div`
  ${tw`min-h-[200px] border-b-[1px] border-b-gray-dark`}
`;

export const FooterAboveInner = styled.div`
  ${tw`pt-16 pb-6 flex justify-between
    md:flex-row
    flex-col
  `}
`;

export const FooterBelow = styled.p`
  ${tw`text-gray-dark m-auto text-center py-6`}
`;

export const FooterLogo = styled.figure`
  ${tw`max-w-[308px] w-full min-h-[106px] flex-shrink-0 flex-grow cursor-pointer relative
    md:mb-2
    mb-5
  `}
`;

export const MainInfo = styled.div`
  ${tw`
    md:w-1/2 md:mb-0
    w-full mb-5
  `}
`;
export const DetailUrl = styled.div`
  ${tw`flex justify-between
    md:w-1/2
    w-full
  `}
`;

export const FooterItem = styled.p`
  ${tw`text-sm font-normal py-1`}
  .bold {
    ${tw`font-medium`}
  }
`;
