import styled from 'styled-components';
import tw from 'twin.macro';

export const BtnShopNow = styled.div<{
  revertColor?: boolean;
  widthFull?: boolean;
}>`
  ${tw`border-solid font-semibold border-black border-[1px] text-[14px] cursor-pointer w-fit px-10 py-4 uppercase text-center`}

  ${({ revertColor }) => (revertColor ? tw`bg-black text-white` : tw``)}
  ${({ widthFull }) => widthFull && tw`w-full`}
`;
