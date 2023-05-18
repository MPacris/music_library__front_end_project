import React from 'react';

function MusicTable({ songs }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Album</th>
          <th>Artist</th>
          <th>Genre</th>
          <th>Release Date</th>
          <th>Running Time</th>
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
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MusicTable;