import React from 'react';
import PropTypes from 'prop-types';
import { ButtonLoad, ContainerDiv } from './Button.styled';

const Button = ({ onClick }) => {
  return (
    <ContainerDiv>
      <ButtonLoad onClick={onClick}>Load more</ButtonLoad>
    </ContainerDiv>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
