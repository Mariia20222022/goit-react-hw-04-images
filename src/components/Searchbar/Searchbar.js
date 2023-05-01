import React, { useState } from 'react';
import MakeIcon from 'components/Icon/Icon';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
function Searchbar(props) {
  const [searchQuery, setSearchQuery] = useState(``);
  const handleChange = event => {
    event.preventDefault();
    const trimmedQuery = searchQuery.trim();

    props.onSubmit(trimmedQuery);
    setSearchQuery(``);
  };
  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={handleChange}>
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
          onChange={event => setSearchQuery(event.target.value)}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default Searchbar;
