import React from 'react';
import * as S from './SectionTitle.styled';

interface ISectionTitle {
  title: string;
}

const SectionTitle = ({ title }: ISectionTitle) => {
  return (
    <S.SectionTitle>
      <S.Text>{title}</S.Text>
    </S.SectionTitle>
  );
};

export default SectionTitle;
