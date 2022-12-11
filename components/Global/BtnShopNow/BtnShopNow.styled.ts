import styled from 'styled-components';
import tw from 'twin.macro';

export const BtnShopNow = styled.button<{
  revertColor?: boolean;
  widthFull?: boolean;
}>`
  ${tw`border-solid font-semibold hover:bg-black hover:text-white border-black border-[1px] transition-[300ms] text-[14px] cursor-pointer w-fit px-10 py-4 uppercase text-center`}

  ${({ revertColor }) =>
    revertColor
      ? tw`bg-black text-white hover:bg-white hover:text-black`
      : tw``}
  ${({ widthFull }) => widthFull && tw`w-full`}
`;
