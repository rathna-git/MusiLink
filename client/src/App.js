import React from 'react';


import './App.css';

function App() {

  React.useEffect(() => {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const accessToken = urlParams.get('access_token');
      const refreshToken = urlParams.get('refresh_token');
  
      console.log(accessToken);
      console.log(refreshToken);
  
      if (refreshToken) {
        fetch(`/refresh_token?refresh_token=${refreshToken}`)
          .then(res => res.json())
          .then(data => console.log(data))
          .catch(err => console.error(err));
      }
  },[]);

  return (
    <div className="App">
      
        <a
          className="App-link"
          href="http://localhost:8888/login"
          target="_blank"
          rel="noopener noreferrer"
        >
          Log in to Spotify
        </a>
  
    </div>
  );
}

export default App;
