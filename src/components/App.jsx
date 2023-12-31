import React, { useState, useEffect } from 'react';
import { StyledApp } from './App.styled';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import { fetchApiData } from '../services/api';
import toast, { Toaster } from 'react-hot-toast';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loadMore, setLoadMore] = useState(true);
  const [totalImages, setTotalImages] = useState(0);
  const [notificationShown, setNotificationShown] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!query) return;

      try {
        setLoading(true);

        const data = await fetchApiData(query, page);

        const totalHits = data.totalHits || 0;

        if (totalHits === 0) {
          toast.error('No se encontraron imágenes', {
            position: 'top-right',
            autoClose: 3000,
          });
        } else if (!notificationShown) {
          toast.success(`Total de imágenes encontradas: ${totalHits}`, {
            position: 'top-right',
            autoClose: 3000,
          });

          setNotificationShown(true);
          setTotalImages(totalHits);
        }

        setImages((prev) => (page === 1 ? data.hits : [...prev, ...data.hits]));
        setLoadMore(page < Math.ceil(totalHits / 12));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, page, notificationShown]); 
  
  const handleSearchSubmit = (value) => {
    setQuery(value);
    setPage(1);
    setImages([]);
    setLoadMore(true);
    setNotificationShown(false);
  };

  const loadMoreImages = () => {
    const remainingImages = totalImages - page * 12;
    toast.success(`Quedan ${remainingImages} imágenes de las ${totalImages} originales.`, {
      position: 'top-right',
      autoClose: 3000,
    });

    setPage((prev) => prev + 1);
  };

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <StyledApp>
      <Toaster position="top-center" reverseOrder={false} />
      <Searchbar onSubmit={handleSearchSubmit} />
      <ImageGallery images={images} openModal={openModal} />
      {loading && <Loader />}
      {loadMore && images.length > 0 && !loading && <Button onClick={loadMoreImages} />}
      {selectedImage && <Modal image={selectedImage} closeModal={closeModal} />}
    </StyledApp>
  );
};

export default App;
