import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateSongModal from '../UpdateSongModal/UpdateSongModal';

function MusicTable({ songs }) {
  const [selectedSong, setSelectedSong] = useState(null);
  const [totalRunningTime, setTotalRunningTime] = useState(0);

  useEffect(() => {
    function calculateTotalRunningTime() {
      let total = 0;
      songs.forEach((song) => {
        total += song.running_time;
      });
      setTotalRunningTime(total);
    }

    calculateTotalRunningTime();
  }, [songs]);

  function handleUpdate(song) {
    setSelectedSong(song);
  }

  async function handleDelete(songId) {
    try {
      await axios.delete(`http://127.0.0.1:5000/api/songs/${songId}`);
      setSelectedSong(null);
    } catch (error) {
      console.log('Error in delete song API call!', error);
    }
  }

  function handleCloseModal() {
    setSelectedSong(null);
  }

  function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  return (
    <div className='bottom-container'>
      <h3>Music Library</h3>
      <div className="running-time-summary">
        Total Running Time: {formatTime(totalRunningTime)} minutes
      </div>
      <table className="music-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Album</th>
            <th>Artist</th>
            <th>Genre</th>
            <th>Release Date</th>
            <th>Running Time (seconds)</th>
            <th>Likes</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song) => (
            <tr key={song.id}>
              <td>{song.title}</td>
              <td>{song.album}</td>
              <td>{song.artist}</td>
              <td>{song.genre}</td>
              <td>{song.release_date}</td>
              <td>{song.running_time}</td>
              <td>{song.likes}</td>
              <td>
                <button onClick={() => handleUpdate(song)}>Edit</button>
              </td>
              <td>
                <button onClick={() => handleDelete(song.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedSong && (
        <UpdateSongModal
          song={selectedSong}
          onUpdate={handleCloseModal}
        />
      )}
    </div>
  );
}

export default MusicTable;