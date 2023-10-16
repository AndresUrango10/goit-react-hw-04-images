import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ModalContainer, ModalOverlay } from './Modal.styled';

const Modal = ({ image, closeModal }) => {
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [closeModal]);

  return (
    <ModalOverlay onClick={closeModal}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <img src={image.largeImageURL} alt="" />
      </ModalContainer>
    </ModalOverlay>
  );
};

Modal.propTypes = {
  image: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
