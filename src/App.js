import React, { useState, useEffect } from 'react';
import axios from 'axios';


function App() {


  useEffect(() => {
    makeGetRequest();
  },[])

  async function makeGetRequest(){
    try{
    let response = await axios.get('http://127.0.0.1:5000/api/songs');
    console.log(response.data);
  } catch (ex) {
    console.log('Error in makeGetRequest API call!');
  }
  }


  return (
    <div>
      <h3>Async Await Axios Example</h3>
      <button onClick={makeGetRequest}>Remake Await Request</button>
    </div>
);
}


export default App;
