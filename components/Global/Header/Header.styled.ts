import styled from 'styled-components';
import tw from 'twin.macro';

export const Header = styled.div`
  ${tw``}
`;

export const Center = styled.div`
  ${tw`flex justify-center`}
`;

export const WrapImage = styled.figure`
  ${tw`relative w-[150px]`}
`;

export const Navbar = styled.div`
  ${tw`flex gap-10  justify-center`}
`;

export const Text = styled.a`
  ${tw`uppercase  font-medium cursor-pointer pb-1 border-0 duration-300`}

  &:hover {
    ${tw`border-b-[1px] border-solid border-black`}
  }
`;
