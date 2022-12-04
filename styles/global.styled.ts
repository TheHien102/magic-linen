import styled from 'styled-components';
import tw from 'twin.macro';

export const Container = styled.div`
  ${tw`container`}
`;

export const LabelInput = styled.label`
  ${tw`font-semibold text-[14px]`}
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

export const ErrorText = styled.p`
  ${tw`text-[16px] text-[red]`}
`;
