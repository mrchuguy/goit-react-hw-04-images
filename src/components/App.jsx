import { Component } from 'react';
import { Button } from './Button/Button';
import { GlobalStyle } from './GlobalStyle';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import axios from 'axios';
import { Loader } from './Loader/Loader';
import toast, { Toaster } from 'react-hot-toast';
import { Modale } from './Modale/Modale';

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

export class App extends Component {
  state = {
    images: [],
    page: 1,
    maxPage: 1,
    query: '',
    isLoading: false,
    modalImage: null,
  };

  componentDidUpdate(_, prevState) {
    const { page, query } = this.state;
    if (prevState.page !== page || prevState.query !== query) {
      this.fetchImages();
    }
  }

  changeQuery = query => {
    this.setState({ images: [], page: 1, query: query });
  };

  changePage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  closeModal = () => {
    this.setState({ modalImage: null });
  };

  openModal = id => {
    const image = this.state.images.find(image => image.id === id);
    this.setState({ modalImage: image });
  };

  fetchImages = async () => {
    this.setState({ isLoading: true });
    const { page, query } = this.state;
    fetchParams.params.q = query;
    fetchParams.params.page = page;
    try {
      const response = await axios.get(`https://pixabay.com/api/`, fetchParams);
      if (response.data.totalHits > 0) {
        this.setState(prevState => ({
          images: [...prevState.images, ...response.data.hits],
          maxPage: Math.ceil(
            response.data.totalHits / fetchParams.params.per_page
          ),
        }));
      } else {
        toast.error('Search result not successful. Please try again');
      }
    } catch {
      toast.error('Oops, something went wrong. please try again later');
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { images, isLoading, page, maxPage, modalImage } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.changeQuery} />
        {isLoading && <Loader />}
        {images.length > 0 && (
          <ImageGallery images={images} onOpenModale={this.openModal} />
        )}
        {images.length > 0 && page < maxPage && (
          <Button onClick={this.changePage} />
        )}
        {modalImage !== null && (
          <Modale onClose={this.closeModal} image={modalImage} />
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
  }
}
