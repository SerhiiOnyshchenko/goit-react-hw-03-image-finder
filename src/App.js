import ImageGallery from 'components/ImageGallery/ImageGallery';
import Searchbar from 'components/Searchbar/Searchbar';
import React, { Component } from 'react';
import SearchApi from './components/Api/Api';
import Notiflix from 'notiflix';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import Loader from 'components/Loader/Loader';
import * as Scroll from 'react-scroll';

class App extends Component {
   state = {
      searchName: '',
      countPage: 1,
      per_page: 12,
      ImagesList: [],
      showModal: false,
      showLoadMore: false,
      loading: false,
      openModalItem: { url: '', alt: '' },
   };
   onApiError = () => {
      Notiflix.Notify.failure(
         'Sorry, there are no images matching your search query. Please try again.'
      );
      this.setState({ showLoadMore: false, loading: false });
   };
   onSearchName = name => {
      this.setState(
         {
            searchName: name,
            countPage: 1,
            ImagesList: [],
            showLoadMore: false,
            loading: true,
         },
         () => {
            const { searchName, countPage, per_page } = this.state;
            SearchApi(searchName, countPage, per_page)
               .then(date => {
                  this.setState({
                     ImagesList: date.hits,
                     loading: false,
                  });
                  if (date.total !== date.hits.length) {
                     this.setState({ showLoadMore: true });
                  }
               })
               .catch(this.onApiError);
         }
      );
   };
   loadeMore = () => {
      this.setState(
         prev => ({
            countPage: prev.countPage + 1,
            showLoadMore: false,
            loading: true,
         }),
         () => {
            const { searchName, countPage, per_page, ImagesList } = this.state;
            SearchApi(searchName, countPage, per_page)
               .then(date => {
                  this.setState(prev => ({
                     ImagesList: [...prev.ImagesList, ...date.hits],
                     showLoadMore: true,
                     loading: false,
                  }));
                  if (date.total <= ImagesList.length + per_page) {
                     this.setState({ showLoadMore: false });
                     Notiflix.Notify.info(
                        "We're sorry, but you've reached the end of search results."
                     );
                  }
               })
               .catch(this.onApiError);
         }
      );
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
            <Searchbar onSubmit={this.onSearchName} />
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
               <Button onClick={this.loadeMore}>Load more</Button>
            )}
         </div>
      );
   }
}

export default App;
