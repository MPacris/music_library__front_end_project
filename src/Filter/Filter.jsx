import React, { useState } from 'react';
import './Filter.css'

function Filter({ onFilter }) {
  const [filterType, setFilterType] = useState('');
  const [filterValue, setFilterValue] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    onFilter(filterType, filterValue);
  }

  return (
    <form onSubmit={handleSubmit} className='filter-section'>
      <h3>Filter</h3>
      <select value={filterType} onChange={(event) => setFilterType(event.target.value)}>
        <option value="">Select Filter Type</option>
        <option value="album">Album</option>
        <option value="artist">Artist</option>
        <option value="genre">Genre</option>
        <option value="releaseDate">Release Date</option>
        <option value="title">Title</option>
      </select>
      <input
        type="text"
        placeholder="Filter Value"
        value={filterValue}
        onChange={(event) => setFilterValue(event.target.value)}
        required
      />
      <button type="submit">Apply Filter</button>
    </form>
  );
}

export default Filter;