import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MusicTable from './MusicTable/MusicTable';
import SearchBar from './SearchBar/SearchBar';
import Filter from './Filter/Filter';

function App() {
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/songs');
      setSongs(response.data.songs);
      setFilteredSongs(response.data.songs);
    } catch (ex) {
      console.log('Error in fetchData API call!');
    }
  }

  function handleSearch(term) {
    const filtered = songs.filter((song) => {
      const searchTerm = term.toLowerCase();
      return (
        song.title.toLowerCase().includes(searchTerm) ||
        song.album.toLowerCase().includes(searchTerm) ||
        song.artist.toLowerCase().includes(searchTerm) ||
        song.genre.toLowerCase().includes(searchTerm) ||
        song.release_date.toLowerCase().includes(searchTerm)
      );
    });
    setFilteredSongs(filtered);
  }

  function handleFilter(filterType, filterValue) {
    const filtered = songs.filter((song) => {
      const lowerCaseFilterValue = filterValue.toLowerCase();
      switch (filterType) {
        case 'album':
          return song.album.toLowerCase().includes(lowerCaseFilterValue);
        case 'artist':
          return song.artist.toLowerCase().includes(lowerCaseFilterValue);
        case 'genre':
          return song.genre.toLowerCase().includes(lowerCaseFilterValue);
        case 'releaseDate':
          return song.release_date.toLowerCase().includes(lowerCaseFilterValue);
        case 'title':
          return song.title.toLowerCase().includes(lowerCaseFilterValue);
        default:
          return true;
      }
    });
    setFilteredSongs(filtered);
  }

  return (
    <div>
      <h3>Music Library</h3>
      <SearchBar onSearch={handleSearch} />
      <Filter onFilter={handleFilter} />
      <MusicTable songs={filteredSongs} />
    </div>
  );
}

export default App;