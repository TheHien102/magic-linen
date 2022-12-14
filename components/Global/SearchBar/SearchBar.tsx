import React from 'react';
import * as S from './SearchBar.styled';
import { Search } from '@mui/icons-material';

interface ISearchBar {
  value: string;
  setValue: (value: string) => void;
}
const SearchBar = ({ value, setValue }: ISearchBar) => {
  return (
    <S.Search>
      <S.SearchIconWrapper>
        <Search />
      </S.SearchIconWrapper>
      <S.StyledInputBase
        placeholder='Search…'
        inputProps={{ 'aria-label': 'search' }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </S.Search>
  );
};

export default SearchBar;
