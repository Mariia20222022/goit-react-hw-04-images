import React, { useState } from 'react';
import MakeGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import Modal from './Modal/Modal';

function App() {
  const [searchQuery, setSearchQuery] = useState(``);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const handleFormSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setCurrentPage(1);
  };
  const handleLoadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };
  const toggleModal = () => {
    setShowModal(prevModal => !prevModal);
  };
  const getLargeImg = largeImageURL => {
    setLargeImageURL(largeImageURL);
    toggleModal();
  };
  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit} />
      <MakeGallery
        searchQuery={searchQuery}
        currentPage={currentPage}
        onLoadMore={handleLoadMore}
        getLargeImg={getLargeImg}
      />
      {showModal && <Modal url={largeImageURL} onClose={toggleModal} />}
    </div>
  );
}

export default App;
