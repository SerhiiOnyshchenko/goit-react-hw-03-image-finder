import React, { Component } from 'react';
import './Searchbar.css';

class Searchbar extends Component {
   state = {};
   render() {
      return (
         <header className="Searchbar">
            <form className="SearchForm">
               <button type="submit" className="SearchForm-button"></button>
               <label className="SearchForm-button-label"></label>
               <input
                  className="SearchForm-input"
                  type="text"
                  autoComplete="off"
                  autoFocus={true}
                  placeholder="Search images and photos"
               />
            </form>
         </header>
      );
   }
}

export default Searchbar;
