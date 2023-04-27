import React, { Component } from 'react';
import MakeGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import Modal from './Modal/Modal';

class App extends Component {
  state = {
    searchQuery: '',
    currentPage: 1,
    showModal: false,
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery, currentPage: 1 });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  getLargeImg = largeImageURL => {
    this.setState({ largeImageURL });
    this.toggleModal();
  };
  render() {
    const { searchQuery, currentPage, largeImageURL, showModal } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <MakeGallery
          searchQuery={searchQuery}
          currentPage={currentPage}
          onLoadMore={this.handleLoadMore}
          getLargeImg={this.getLargeImg}
        />
        {showModal && <Modal url={largeImageURL} onClose={this.toggleModal} />}
      </div>
    );
  }
}

export default App;
