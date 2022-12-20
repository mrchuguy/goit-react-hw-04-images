import { useState } from 'react';
import {
  SearchbarWrap,
  SearchButton,
  SearchButtonLabel,
  SearchForm,
  SearchInput,
} from './Searchbar.styled';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmit }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = e => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(searchValue);
  };

  return (
    <SearchbarWrap>
      <SearchForm onSubmit={handleSubmit}>
        <SearchButton>
          <SearchButtonLabel>Search</SearchButtonLabel>
        </SearchButton>

        <SearchInput
          onChange={handleChange}
          value={searchValue}
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchbarWrap>
  );
};

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
