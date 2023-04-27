import React, { Component } from 'react';
import MakeGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { fetchPhoto } from 'components/Services/Api';
import css from './ImageGallery.module.css';
import LoadMoreButton from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import Loader from 'components/Circles/Circles';
import PropTypes from 'prop-types';
class MakeGallery extends Component {
  static propTypes = {
    searchQuery: PropTypes.string.isRequired,
    currentPage: PropTypes.number.isRequired,
    onLoadMore: PropTypes.func.isRequired,
    getLargeImg: PropTypes.func.isRequired,
  };
  state = {
    images: [],
    status: 'idle',
    selectedImageUrl: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.fetchLoad();
    }
    if (
      prevProps.currentPage !== this.props.currentPage &&
      this.props.currentPage > 1
    ) {
      this.fetchLoadMore();
    }
  }
  handleClickLoadMore = () => {
    this.props.onLoadMore();

    this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
  };

  fetchLoad = () => {
    const { searchQuery, currentPage } = this.props;
    this.setState({ status: 'pending' });
    fetchPhoto(searchQuery, currentPage)
      .then(response => {
        this.setState({
          images: response.hits,
          status: 'resolved',
        });
      })
      .catch(error => this.setState({ status: 'rejected' }));
  };

  fetchLoadMore = () => {
    const { searchQuery, currentPage } = this.props;
    this.setState({ status: 'pending' });
    fetchPhoto(searchQuery, currentPage)
      .then(response => {
        this.setState(prevState => ({
          images: [...prevState.images, ...response.hits],
          status: 'resolved',
        }));
      })
      .catch(error => this.setState({ status: 'rejected' }));
  };

  handleClick = () => {
    this.props.onLoadMore();
  };

  handleOpenModal = url => {
    this.setState({ selectedImageUrl: url });
  };

  handleCloseModal = () => {
    this.setState({ selectedImageUrl: null });
  };

  render() {
    const { images, status, selectedImageUrl } = this.state;

    return (
      <div className={css.wrapper}>
        {status === 'pending' && <Loader />}
        {status === 'rejected' && (
          <div>Something went wrong. Please try again later.</div>
        )}
        {status === 'resolved' && (
          <>
            <ul className={css.gallery}>
              {images.map(({ id, webformatURL, tags, largeImageURL }) => (
                <MakeGalleryItem
                  key={id}
                  url={webformatURL}
                  tags={tags}
                  onClick={this.handleOpenModal}
                  getLargeImg={this.props.getLargeImg}
                />
              ))}
            </ul>
            {selectedImageUrl && (
              <Modal onClose={this.handleCloseModal}>
                <img src={selectedImageUrl} alt="Selected" />
              </Modal>
            )}
            {images.length > 0 && (
              <LoadMoreButton onClick={this.handleClickLoadMore} />
            )}
          </>
        )}
      </div>
    );
  }
}

export default MakeGallery;
