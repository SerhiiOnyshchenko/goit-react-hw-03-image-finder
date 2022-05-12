import ImageGallery from 'components/ImageGallery/ImageGallery';
import Searchbar from 'components/Searchbar/Searchbar';
import React, { Component } from 'react';

class App extends Component {
   state = {};
   render() {
      return (
         <div className="App">
            <Searchbar />
            <ImageGallery params={[{ url: '/', alt: 'alt' }]} />
         </div>
      );
   }
}

export default App;
