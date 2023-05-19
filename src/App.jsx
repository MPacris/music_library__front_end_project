import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MusicTable from './MusicTable/MusicTable';
import SearchBar from './SearchBar/SearchBar';
import Filter from './Filter/Filter';
import AddSongForm from './AddSongForm/AddSongForm';

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
        song.release_date.toLowerCase().includes(searchTerm) ||
        song.running_time.toLowerCase().includes(searchTerm)
      );
    });
    setFilteredSongs(filtered);
  }

  function handleFilter(filterType, filterValue) {
    const filtered = songs.filter((song) => {
      const lowerCaseFilterValue = filterValue.toLowerCase();
      const filterChoices = {
        album: song.album.toLowerCase(),
        artist: song.artist.toLowerCase(),
        genre: song.genre.toLowerCase(),
        releaseDate: song.release_date.toLowerCase(),
        runningTime: song.running_time.toString(),
        title: song.title.toLowerCase()
      };
  
      if (filterType in filterChoices) {
        return filterChoices[filterType].includes(lowerCaseFilterValue);
      } else {
        return true;
      }
    });
  
    setFilteredSongs(filtered);
  }

  async function addSong(songData) {
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/songs', songData);
      setSongs([...songs, response.data.song]);
      setFilteredSongs([...filteredSongs, response.data.song]);  //put in so that if I was filtering I can still add from that page
    } catch (ex) {
      console.log('Error in addSong API call!');
    }
  }

  return (
    <div>
      <h3>Music Library</h3>
      <SearchBar onSearch={handleSearch} />
      <Filter onFilter={handleFilter} />
      <MusicTable songs={filteredSongs} />
      <AddSongForm onAddSong={addSong} />
    </div>
  );
}

export default App;