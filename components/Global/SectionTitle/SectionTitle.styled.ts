import styled from 'styled-components';
import tw from 'twin.macro';

export const SectionTitle = styled.h2`
  ${tw`font-normal relative z-10 text-center`}

  &:after {
    content: '';
    width: 100%;
    display: inline-block;
    border-bottom: 1px solid #f0f0f0;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    z-index: 0;
  }
`;

export const Text = styled.a`
  ${tw`font-light relative  uppercase z-10 mx-auto bg-white px-16`}
`;
