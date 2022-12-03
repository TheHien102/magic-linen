import styled from 'styled-components';
import tw from 'twin.macro';

export const Header = styled.div`
  ${tw``}
`;

export const Center = styled.div`
  ${tw`flex justify-between items-center border-0 border-b-[1px] border-[#efeeed] mb-3 border-solid`}
`;

export const WrapImage = styled.figure`
  ${tw`relative w-[130px] mb-1 cursor-pointer`}
`;

export const Navbar = styled.div`
  ${tw`flex gap-10  justify-center border-0 border-b-[1px] pb-2 border-[#efeeed] mb-3 border-solid`}
`;

export const Text = styled.a`
  ${tw`uppercase text-[15px]  cursor-pointer border-0 border-b-[1px]  border-solid border-transparent duration-300`}

  &:hover {
    ${tw` border-black`}
  }
`;

export const WrapBtnLogin = styled.div`
  ${tw``}
`;

export const BtnLogin = styled.a`
  ${tw`uppercase cursor-pointer hover:underline text-[12px] tracking-wide`}
`;
