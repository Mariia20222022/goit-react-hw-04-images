import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

class Modal extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,

    onClick: PropTypes.func.isRequired,
  };

  state = {};

  componentDidMount() {
    window.addEventListener('keydown', this.onClickEscape);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onClickEscape);
  }

  clickBackdrop = event => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  };

  onClickEscape = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    return (
      <div className={css.overlay} onClick={this.clickBackdrop}>
        <div className={css.modal}>
          <img src={this.props.url} alt="" />
        </div>
      </div>
    );
  }
}

export default Modal;
