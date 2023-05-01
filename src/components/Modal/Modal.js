import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';
function Modal(props) {
  const clickBackdrop = event => {
    if (event.target === event.currentTarget) {
      props.onClose();
    }
  };

  const onClickEscape = event => {
    if (event.code === 'Escape') {
      props.onClose();
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', onClickEscape);
    return () => {
      window.removeEventListener('keydown', onClickEscape);
    };
  });
  return (
    <div className={css.overlay} onClick={clickBackdrop}>
      <div className={css.modal}>
        <img src={props.url} alt="" />
      </div>
    </div>
  );
}
Modal.propTypes = {
  url: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
