import styled from 'styled-components';
import tw from 'twin.macro';

export const Layout = styled.div`
  ${tw`flex flex-col justify-between min-h-screen`}
`;
export const LayoutInner = styled.div`
  ${tw``}
`;
export const Profile = styled.div`
  ${tw``}
`;

export const Flex = styled.div`
  ${tw`flex justify-between`}
`;

export const ColLeft = styled.div`
  ${tw`w-[45%]  `}
`;

export const BtnWrap = styled.div`
  ${tw`border-0 border-b-[1px] mb-5 py-4 cursor-pointer uppercase w-full border-solid border-[#e4e3df]`}
`;

export const ColRight = styled.div`
  ${tw`w-[45%] `}
`;
