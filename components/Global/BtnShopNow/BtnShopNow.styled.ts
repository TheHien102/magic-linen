import styled from 'styled-components';
import tw from 'twin.macro';

export const BtnShopNow = styled.div<{ revertColor?: boolean }>`
  ${tw`border-solid border-black border-[1px] text-[15px] cursor-pointer w-fit px-10 py-3 uppercase`}

  ${({ revertColor }) => (revertColor ? tw`bg-black text-white` : tw``)}
`;
