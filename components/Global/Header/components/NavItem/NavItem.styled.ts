import styled from 'styled-components';
import tw from 'twin.macro';

export const NavItem = styled.div`
  ${tw`
    h-16 flex justify-center flex-col items-center
    md:w-auto md:ml-12
    w-full
  `}
`;

export const NavUrl = styled.a`
  ${tw`
    text-[16px] text-gray-light
    font-medium
    h-full border-b-2 border-b-gray-light
    flex justify-center flex-col items-center
    cursor-pointer duration-250
    md:w-auto
    w-full
  `}
  &.active, &:hover {
    ${tw`border-b-green text-green`}
  }
`;

export const NavContact = styled.a`
  ${tw`
  bg-green text-base text-black-light duration-250 border-2 border-transparent uppercase
    rounded-l rounded-r-[20px] p-1 font-bold justify-between items-center gap-2
    cursor-pointer hover:bg-black-light hover:text-green hover:border-green
    md:flex
    hidden
  `}
`;

export const FlashIcon = styled.figure`
  ${tw`
    rounded-full bg-black h-6 w-6 p-[4px]
  `}
`;
