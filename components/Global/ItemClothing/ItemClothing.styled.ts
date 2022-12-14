import styled from 'styled-components';
import tw from 'twin.macro';

export const ItemClothing = styled.div`
  ${tw`max-w-[270px] flex flex-col justify-between`}
`;

export const WrapImage = styled.figure`
  ${tw`relative m-0 cursor-pointer`}
`;

export const Company = styled.div`
  ${tw``}
`;

export const Text = styled.a`
  ${tw`hover:underline cursor-pointer text-[16px] text-gray mt-1`}
`;

export const WrapColor = styled.div`
  ${tw`flex gap-3 mt-1`}
`;

export const WrapPrice = styled.div`
  ${tw`flex gap-3 mt-2 justify-between`}
`;

export const TextPrice = styled.p`
  ${tw` text-[14px] text-gray`}
`;

// export const Color = styled.div<{ color: string }>`
//   ${tw`w-5 h-5 border-solid border-gray border-2 rounded-full`}

//   ${({ color }) => (color ? tw`bg-[${color}] ` : '')}
// `;

export const ColorBlue = styled.div`
  ${tw`w-5 h-5 border-solid border-gray border-2 rounded-full bg-blue-600`}
`;

// export const Color = styled.div<{ color: boolean }>`
//   ${tw`w-5 h-5 border-solid border-gray-light rounded-full `}

//   ${({ color }) => color && tw`bg-${color}`}
// `;
