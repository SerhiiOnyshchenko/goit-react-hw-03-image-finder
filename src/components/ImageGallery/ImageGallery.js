import './ImageGallery.css';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';

export default function ImageGallery({ params }) {
   return (
      <ul className="ImageGallery">
         {params.map(param => (
            <ImageGalleryItem key={param} params={param} />
         ))}
      </ul>
   );
}
