import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MusicTable from './MusicTable/MusicTable';

function App() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/songs');
      setSongs(response.data.songs);
    } catch (ex) {
      console.log('Error in fetchData API call!');
    }
  }

  return (
    <div>
      <h3>Music Library</h3>
      <MusicTable songs={songs} />
    </div>
  );
}

export default App;