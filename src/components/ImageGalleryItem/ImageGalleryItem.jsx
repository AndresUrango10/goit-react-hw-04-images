import React from 'react';
import PropTypes from 'prop-types';
import { LiImage, Img } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ image, openModal }) => {
  return (
    <LiImage onClick={() => openModal(image)}>
      <Img src={image.webformatURL} alt={image.tags} />
    </LiImage>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
