import React, { Component } from 'react';
import MakeIcon from 'components/Icon/Icon';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
class Searchbar extends Component {
  state = {
    searchQuery: ``,
  };

  handleChange = event => {
    event.preventDefault();
    const searchQuery = this.state.searchQuery.trim();
    this.props.onSubmit(searchQuery);
    this.setState({ searchQuery: '' });
  };
  render() {
    const { searchQuery } = this.state;

    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleChange}>
          <button type="submit" className={css.button}>
            <MakeIcon />
          </button>

          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="searchQuery"
            value={searchQuery}
            onChange={event =>
              this.setState({ searchQuery: event.target.value })
            }
          />
        </form>
      </header>
    );
  }
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default Searchbar;
