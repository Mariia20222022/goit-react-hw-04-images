import css from './Button.module.css';
function LoadMoreButton({ onClick }) {
  return (
    <button className={css.button} onClick={onClick}>
      Load more
    </button>
  );
}
export default LoadMoreButton;
