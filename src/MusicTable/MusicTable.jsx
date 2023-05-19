import React from 'react';
import './MusicTable.css';

function MusicTable({ songs }) {
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
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

export default MusicTable;