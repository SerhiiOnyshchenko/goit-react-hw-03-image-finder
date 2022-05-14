import ImageGallery from 'components/ImageGallery/ImageGallery';
import Searchbar from 'components/Searchbar/Searchbar';
import React, { Component } from 'react';
import SearchApi from 'services/Api';
import Notiflix from 'notiflix';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import Loader from 'components/Loader/Loader';
import * as Scroll from 'react-scroll';

class App extends Component {
   state = {
      searchName: '',
      countPage: 0,
      per_page: 12,
      ImagesList: [],
      showModal: false,
      showLoadMore: false,
      loading: false,
      openModalItem: { url: '', alt: '' },
   };

   componentDidUpdate(prevProps, prevState) {
      const { searchName, per_page, countPage, ImagesList } = this.state;

      if (prevState.countPage !== countPage || ImagesList.length === 0) {
         SearchApi(searchName, countPage, per_page)
            .then(date => {
               this.setState(prev => ({
                  ImagesList: [...prev.ImagesList, ...date.hits],
                  totalHits: date.totalHits,
                  loading: false,
               }));
               if (date.total !== date.hits.length) {
                  this.setState({ showLoadMore: true });
               }
               if (countPage === 1) {
                  Notiflix.Notify.success(
                     `Hooray! We found ${date.totalHits} images.`
                  );
               }
               if (date.total <= ImagesList.length + per_page) {
                  this.setState({ showLoadMore: false });
                  Notiflix.Notify.info(
                     "We're sorry, but you've reached the end of search results."
                  );
               }
            })
            .catch(this.onApiError);
      }
   }
   onApiError = () => {
      Notiflix.Notify.failure(
         'Sorry, there are no images matching your search query. Please try again.'
      );
      this.setState({ showLoadMore: false, loading: false });
   };

   onSubmit = name => {
      this.setState({
         searchName: name,
         countPage: 1,
         ImagesList: [],
         showLoadMore: false,
         loading: true,
      });
   };

   onloadeMore = () => {
      this.setState(prev => ({
         countPage: prev.countPage + 1,
         showLoadMore: false,
         loading: true,
      }));
      this.scrollSlowly();
   };

   scrollSlowly = () => {
      const { height: cardHeight } = document
         .querySelector('#ImageGallery')
         .firstElementChild.getBoundingClientRect();
      Scroll.animateScroll.scrollMore(cardHeight * 2);
   };
   openModal = (url, alt) => {
      const openModalItem = { url, alt };
      this.setState({
         showModal: true,
         openModalItem,
      });
   };
   closeModal = () => {
      this.setState({ showModal: false });
   };
   render() {
      const { ImagesList, showModal, openModalItem, showLoadMore, loading } =
         this.state;
      return (
         <div className="App">
            <Searchbar onSubmit={this.onSubmit} />
            {showModal && (
               <Modal
                  url={openModalItem.url}
                  alt={openModalItem.alt}
                  onClose={this.closeModal}
               />
            )}
            <ImageGallery params={ImagesList} openModal={this.openModal} />
            {loading && <Loader />}
            {showLoadMore && (
               <Button onClick={this.onloadeMore} title="Load more" />
            )}
         </div>
      );
   }
}

export default App;
