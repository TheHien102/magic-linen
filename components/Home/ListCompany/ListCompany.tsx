import Image from 'next/image';
import React from 'react';
import { companyData } from '../../../utils/dataConfig';
import * as S from './ListCompany.styled';

type Props = {};

const ListCompany = (props: Props) => {
  return (
    <S.ListCompany>
      {companyData.map((it, id) => (
        <S.WrapImage key={id}>
          <Image src={it.url} alt={it.alt} />
        </S.WrapImage>
      ))}
    </S.ListCompany>
  );
};

export default ListCompany;
