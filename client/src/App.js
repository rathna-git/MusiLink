import React from 'react';

import { accessToken, logout } from './Spotify';

import './App.css';

function App() {

  const [token, setToken] = React.useState(null);

  React.useEffect(() => {
   setToken(accessToken);
  },[]);

  return (
    <div className="App">
      <header className="App-header">
        {!token ? (
          <a className="App-link" href="http://localhost:8888/login" >
            Log in to Spotify
          </a>
        ): (
          <>
            <h1>Logged in!</h1>
            <button onClick={logout}>Log Out</button>
          </>
        )}

      </header>
    </div>
  );
}

export default App;
