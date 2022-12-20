import { Button } from './Button/Button';
import { GlobalStyle } from './GlobalStyle';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import axios from 'axios';
import { Loader } from './Loader/Loader';
import toast, { Toaster } from 'react-hot-toast';
import { Modale } from './Modale/Modale';
import { useState } from 'react';
import { useEffect } from 'react';

let fetchParams = {
  params: {
    q: '',
    page: 1,
    key: '30688451-760a190d43b2b36afa0e2975a',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  },
};

export const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      fetchParams.params.q = query;
      fetchParams.params.page = page;
      try {
        const response = await axios.get(
          `https://pixabay.com/api/`,
          fetchParams
        );
        if (response.data.totalHits > 0) {
          setImages(prevState => [...prevState, ...response.data.hits]);
          setMaxPage(
            Math.ceil(response.data.totalHits / fetchParams.params.per_page)
          );
        } else {
          toast.error('Search result not successful. Please try again');
        }
      } catch {
        toast.error('Oops, something went wrong. please try again later');
      } finally {
        setIsLoading(false);
      }
    };

    if (query !== '') {
      fetchImages();
    }
  }, [page, query]);

  const changeQuery = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
  };

  const changePage = () => {
    setPage(prevState => prevState + 1);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  const openModal = id => {
    const image = images.find(image => image.id === id);
    setModalImage(image);
  };

  return (
    <>
      <Searchbar onSubmit={changeQuery} />
      {isLoading && <Loader />}
      {images.length > 0 && (
        <ImageGallery images={images} onOpenModale={openModal} />
      )}
      {images.length > 0 && page < maxPage && <Button onClick={changePage} />}
      {modalImage !== null && (
        <Modale onClose={closeModal} image={modalImage} />
      )}
      <GlobalStyle />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
        }}
      />
    </>
  );
};
