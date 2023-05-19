import React, { useState } from 'react';
import axios from 'axios';

function AddSongForm({ onAddSong }) {
  const [title, setTitle] = useState('');
  const [album, setAlbum] = useState('');
  const [artist, setArtist] = useState('');
  const [genre, setGenre] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [runningTime, setRunningTime] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/songs', {
        title,
        album,
        artist,
        genre,
        release_date: releaseDate,
        running_time: runningTime,
      });
      const newSong = response.data;
      onAddSong(newSong);
      setTitle('');
      setAlbum('');
      setArtist('');
      setGenre('');
      setReleaseDate('');
      setRunningTime('');
    } catch (ex) {
      console.log('Error in add song API call!', ex);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Album"
        value={album}
        onChange={(event) => setAlbum(event.target.value)}
      
      />
      <input
        type="text"
        placeholder="Artist"
        value={artist}
        onChange={(event) => setArtist(event.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Genre"
        value={genre}
        onChange={(event) => setGenre(event.target.value)}
        
      />
      <input
        type="text"
        placeholder="Release Date (yyyy-mm-dd)"
        pattern="\d{4}-\d{2}-\d{2}"
        value={releaseDate}
        onChange={(event) => setReleaseDate(event.target.value)}
        
      />
      <input
        type="text"
        placeholder="Running Time"
        value={runningTime}
        onChange={(event) => setRunningTime(event.target.value)}
        
      />
      <button type="submit">Add Song</button>
    </form>
  );
}

export default AddSongForm;