import styled from 'styled-components';
import tw from 'twin.macro';

export const Register = styled.div`
  ${tw``}
`;

export const Input = styled.input<{ widthFull?: boolean }>`
  ${tw`h-14 text-[16px] px-4 mt-2`}

  &:focus {
    border: 1px solid #979797;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgb(0 123 255 / 25%);
  }

  ${({ widthFull }) => widthFull && tw`w-full`}
`;
