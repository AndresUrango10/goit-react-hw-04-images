import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';
import {
  HeaderSearchbar,
  SearchForm,
  SearchButton,
  Searchinput,
} from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(inputValue);
    setInputValue('');
  };
  

  return (
    <HeaderSearchbar>
      <SearchForm onSubmit={handleSubmit}>
        <SearchButton type="submit">
          <FaSearch />
        </SearchButton>

        <Searchinput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={inputValue}
          onChange={handleChange}
        />
      </SearchForm>
    </HeaderSearchbar>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
