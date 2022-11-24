import styled from 'styled-components';
import tw from 'twin.macro';

export const HeaderTitle = styled.h1`
  ${tw`font-semibold tracking-widest text-center`}

  &:after {
    content: '';
    width: 48px;
    height: 1px;
    background-color: #000;
    display: block;
    margin: 15px auto 0;
  }
`;

export const Flex = styled.div`
  ${tw`flex`}
`;
