import { GalleryImage, GalleryItem } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ image, onOpenModale }) => {
  return (
    <GalleryItem>
      <GalleryImage
        src={image.webformatURL}
        alt={image.tags}
        onClick={() => {
          onOpenModale(image.id);
        }}
      />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  onOpenModale: PropTypes.func.isRequired,
};
