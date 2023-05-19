import React, { useState } from 'react';
import './SearchBar.css'

function SearchBar({ onSearch }) {
  const [term, setTerm] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    onSearch(term);
  }

  return (
    <form onSubmit={handleSubmit} className='search-bar-sectioon'>
      <h3>SearchBar</h3>
      <input
        type="text"
        placeholder="Search..."
        value={term}
        onChange={(event) => setTerm(event.target.value)}
        className='search-bar'
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;