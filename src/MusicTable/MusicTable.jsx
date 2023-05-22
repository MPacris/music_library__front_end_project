import React, { useState } from 'react';
import UpdateSongModal from '../UpdateSongModal/UpdateSongModal';


function MusicTable({ songs }) {
  const [selectedSong, setSelectedSong] = useState(null);

  function handleUpdate(song) {
    setSelectedSong(song);
  }

  function handleCloseModal() {
    setSelectedSong(null);
  }

  return (
    <div className='bottom-container'>
      <h3>Music Library</h3>
      <table className="music-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Album</th>
            <th>Artist</th>
            <th>Genre</th>
            <th>Release Date</th>
            <th>Running Time</th>
            <th>Likes</th>
            <th>Action</th>
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