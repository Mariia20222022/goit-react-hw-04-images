import React, { useState, useEffect } from 'react';
import MakeGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { fetchPhoto } from 'components/Searchbar/Services/Api';
import css from './ImageGallery.module.css';
import LoadMoreButton from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import Loader from 'components/Circles/Circles';
import PropTypes from 'prop-types';

function MakeGallery({ searchQuery, currentPage, onLoadMore, getLargeImg }) {
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [page, setPage] = useState(currentPage);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }

    setLoading(true);
    setStatus('pending');

    const fetchLoad = async () => {
      try {
        const response = await fetchPhoto(searchQuery, page);
        setImages(prevImages => [...prevImages, ...response.hits]);
        setStatus('resolved');
      } catch (error) {
        setStatus('rejected');
      }
      setLoading(false);
    };

    fetchLoad();
  }, [searchQuery, page]);
  const handleClickLoadMore = async () => {
    setPage(prevPage => prevPage + 1);
  };
  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);
  const handleOpenModal = url => {
    setSelectedImageUrl(url);
  };

  const handleCloseModal = () => {
    setSelectedImageUrl(null);
  };

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
                onClick={handleOpenModal}
                getLargeImg={getLargeImg}
              />
            ))}
          </ul>
          {selectedImageUrl && (
            <Modal onClose={handleCloseModal}>
              <img src={selectedImageUrl} alt="Selected" />
            </Modal>
          )}
          {images.length > 0 && (
            <LoadMoreButton onClick={handleClickLoadMore} />
          )}
        </>
      )}
    </div>
  );
}

MakeGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
  onLoadMore: PropTypes.func.isRequired,
  getLargeImg: PropTypes.func.isRequired,
};

export default MakeGallery;
