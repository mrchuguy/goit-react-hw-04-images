import { ImgModalWrap, Overlay } from './Modale.styled';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

export const Modale = ({ onClose, image: { largeImageURL, tags } }) => {
  useEffect(() => {
    const handleKeyup = event => {
      if (event.code === 'Escape') onClose();
    };

    window.addEventListener('keyup', handleKeyup);
    return () => {
      window.removeEventListener('keyup', handleKeyup);
    };
  }, [onClose]);

  const handleClick = event => {
    if (event.target.tagName !== 'IMG') onClose();
  };

  return (
    <Overlay onClick={handleClick}>
      <ImgModalWrap>
        <img src={largeImageURL} alt={tags} />
      </ImgModalWrap>
    </Overlay>
  );
};

Modale.propTypes = {
  image: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};
