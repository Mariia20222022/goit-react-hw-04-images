import css from './Button.module.css';
import PropTypes from 'prop-types';
function LoadMoreButton({ onClick }) {
  return (
    <button className={css.button} onClick={onClick}>
      Load more
    </button>
  );
}
LoadMoreButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
export default LoadMoreButton;
