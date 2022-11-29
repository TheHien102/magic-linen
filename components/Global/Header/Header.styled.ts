import styled from 'styled-components';
import tw from 'twin.macro';

export const Header = styled.div`
  ${tw``}
`;

export const Center = styled.div`
  ${tw`flex justify-center border-0 border-b-[1px] border-gray mb-3 border-solid`}
`;

export const WrapImage = styled.figure`
  ${tw`relative w-[130px] mb-1`}
`;

export const Navbar = styled.div`
  ${tw`flex gap-10  justify-center border-0 border-b-[1px] pb-2 border-gray mb-3 border-solid`}
`;

export const Text = styled.a`
  ${tw`uppercase text-[15px] font-bold cursor-pointer border-0 border-b-[1px]  border-solid border-transparent duration-300`}

  &:hover {
    ${tw` border-black`}
  }
`;
