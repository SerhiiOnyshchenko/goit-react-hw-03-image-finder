import './ImageGalleryItem.css';
export default function ImageGalleryItem({ url, alt }) {
   return (
      <li className="ImageGalleryItem">
         <img className="ImageGalleryItem-image" src={url} alt={alt} />
      </li>
   );
}
