import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';
function MakeGalleryItem({ url, tags, onClick, getLargeImg }) {
  return (
    <>
      <li className={css.item}>
        <img
          className={css.img}
          src={url}
          alt={tags}
          onClick={() => {
            onClick(url);
            getLargeImg(url);
          }}
        />
      </li>
    </>
  );
}
MakeGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  getLargeImg: PropTypes.func.isRequired,
};
export default MakeGalleryItem;
