import React, { useState } from 'react';
import axios from 'axios';
import './UpdateSongModal.css'

function UpdateSongModal({ song, onUpdate }) {
  const [title, setTitle] = useState(song.title);
  const [album, setAlbum] = useState(song.album);
  const [artist, setArtist] = useState(song.artist);
  const [genre, setGenre] = useState(song.genre);
  const [releaseDate, setReleaseDate] = useState(song.release_date);
  const [runningTime, setRunningTime] = useState(song.running_time);
  const [isUpdating, setIsUpdating] = useState(false);

  async function handleUpdate() {
    try {
      const updatedSong = {
        ...song,
        title,
        album,
        artist,
        genre,
        release_date: releaseDate,
        running_time: runningTime
      };

      setIsUpdating(true);
      await axios.put(`http://127.0.0.1:5000/api/songs/${song.id}`, updatedSong);
      setIsUpdating(false);

      onUpdate(updatedSong);
    } catch (error) {
      console.log('Error in update song API call!', error);
    }
  }

  return (
    <div className="update-song-modal">
      <h3>Edit Song</h3>
      <div className="input-group">
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>Album:</label>
        <input
          type="text"
          value={album}
          onChange={(e) => setAlbum(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>Artist:</label>
        <input
          type="text"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>Genre:</label>
        <input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>Release Date:</label>
        <input
          type="text"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>Running Time:</label>
        <input
          type="text"
          value={runningTime}
          onChange={(e) => setRunningTime(e.target.value)}
        />
      </div>
      <button onClick={handleUpdate} disabled={isUpdating}>
        {isUpdating ? 'Updating...' : 'Update'}
      </button>
    </div>
  );
}

export default UpdateSongModal;