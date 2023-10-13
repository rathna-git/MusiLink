import React from 'react';

import { accessToken, getCurrentUserProfile, logout } from './Spotify';

import './App.css';
import { catchErrors } from './utils';

function App() {

  const [token, setToken] = React.useState(null);
  const [ profile, setProfile ] = React.useState(null);

  React.useEffect(() => {
   setToken(accessToken);

   const fetchData = async() => {
      const {data} = await getCurrentUserProfile();
      setProfile(data);
   };
   catchErrors(fetchData);
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
            <button onClick={logout}>Log Out</button>
            {profile && (
              <div>
                  <h1>{profile.display_name}</h1>  
                  <p>{profile.followers.total} Followers</p> 
                  {profile.images.length && profile.images[0].url && (
                    <img src={profile.images[0].url} alt="Avatar" />
                  )}
              </div>
            )} 
          </>
        )}

      </header>
    </div>
  );
}

export default App;
