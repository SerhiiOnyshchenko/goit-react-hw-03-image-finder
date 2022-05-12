import s from './Button.module.css';
import PropTypes from 'prop-types';

export default function Button({ onClick, children }) {
   return (
      <button className={s.Button} type="button" onClick={onClick}>
         {children}
      </button>
   );
}
Button.propTypes = {
   onClick: PropTypes.func.isRequired,
   children: PropTypes.string.isRequired,
};
