import './ImageGallery.css';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

export default function ImageGallery({ params, openModal }) {
   return (
      <ul className="ImageGallery">
         {params.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
               key={id}
               webformatURL={webformatURL}
               largeImageURL={largeImageURL}
               alt={tags}
               onOpen={() => openModal(largeImageURL, tags)}
            />
         ))}
      </ul>
   );
}
ImageGallery.propTypes = {
   params: PropTypes.arrayOf(
      PropTypes.shape({
         id: PropTypes.number,
         webformatURL: PropTypes.string,
         largeImageURL: PropTypes.string,
         tags: PropTypes.string,
      })
   ),
   openModal: PropTypes.func.isRequired,
};
