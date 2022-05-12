import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
   componentDidMount() {
      window.addEventListener('keydown', this.handelKeyUp);
   }
   componentWillUnmount() {
      window.removeEventListener('keydown', this.handelKeyUp);
   }
   handelKeyUp = e => {
      if (e.code === 'Escape') {
         this.props.onClose();
      }
   };
   handleBackdropClick = e => {
      if (e.target === e.currentTarget) {
         this.props.onClose();
      }
   };
   render() {
      const { url, alt } = this.props;
      return createPortal(
         <div className={s.Overlay} onClick={this.handleBackdropClick}>
            <div className={s.Modal}>
               <img src={url} alt={alt} />
            </div>
         </div>,
         modalRoot
      );
   }
}
Modal.propTypes = {
   url: PropTypes.string.isRequired,
   alt: PropTypes.string.isRequired,
};
export default Modal;
