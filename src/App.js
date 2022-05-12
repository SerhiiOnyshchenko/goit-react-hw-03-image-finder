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
      totalHits: 0,
      showModal: false,
      showLoadMore: false,
      loading: false,
      openModalItem: { url: '', alt: '' },
   };
   onApiError = () => {
      Notiflix.Notify.failure(
         'Sorry, there are no images matching your search query. Please try again.'
      );
      this.setState({ showLoadMore: false });
   };
   onSearchName = async name => {
      await this.setState({
         searchName: name,
         countPage: 1,
         ImagesList: [],
         showLoadMore: false,
         loading: true,
      });
      const { searchName, countPage, per_page } = this.state;
      SearchApi(searchName, countPage, per_page)
         .then(date => {
            if (date.total === date.hits.length) {
               this.setState({ showLoadMore: false });
            } else {
               this.setState({ showLoadMore: true });
            }
            this.setState({
               ImagesList: date.hits,
               totalHits: date.total,
               loading: false,
            });
         })
         .catch(this.onApiError);
   };
   loadeMore = async () => {
      await this.setState(prev => ({
         countPage: prev.countPage + 1,
         showLoadMore: false,
         loading: true,
      }));
      const { searchName, countPage, per_page, ImagesList, totalHits } =
         this.state;
      SearchApi(searchName, countPage, per_page)
         .then(date => {
            this.setState(prev => ({
               ImagesList: [...prev.ImagesList, ...date.hits],
               showLoadMore: true,
               loading: false,
            }));
         })
         .catch(this.onApiError);

      if (totalHits <= ImagesList.length + per_page) {
         this.setState({ showLoadMore: false });
         Notiflix.Notify.info(
            "We're sorry, but you've reached the end of search results."
         );
      }
      this.scrollSlowly();
   };
   scrollSlowly = () => {
      const { height: cardHeight } = document
         .querySelector('.ImageGallery')
         .firstElementChild.getBoundingClientRect();

      Scroll.animateScroll.scrollMore(cardHeight * 2);
   };
   openModal = (url, alt) => {
      const openModalItem = { url: url, alt: alt };
      this.setState({ openModalItem });
      this.setState(({ showModal }) => ({ showModal: !showModal }));
   };
   closeModal = () => {
      this.setState(({ showModal }) => ({ showModal: !showModal }));
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
