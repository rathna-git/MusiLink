import React from 'react';
import {BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom';

import { accessToken, logout } from './Spotify';
import {Login, Profile, TopArtists, TopTracks } from './pages';
import { GlobalStyle } from './styles';
import styled from 'styled-components/macro';


const StyledLogoutButton = styled.button`
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-md);
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: rgba(0,0,0,.7);
  color: var(--white);
  font-size: var(--fz-sm);
  font-weight: 700;
  border-radius: var(--border-radius-pill);
  z-index: 10;
  @media (min-width: 768px) {
    right: var(--spacing-lg);
  }
`;

//Scroll to top of page when changing routes
//https://reactrouter.com/web/guides/scroll-restoration/scroll-to-top
function ScrollToTop(){
  const {pathname} = useLocation();

  React.useEffect(() => {
    window.scrollTo(0,0);
  }, [pathname]);

  return null;
}

function App() {

  const [token, setToken] = React.useState(null);

  React.useEffect(() => {
   setToken(accessToken);
  },[]);


  return (
    <div className="app">
      <GlobalStyle/>
 
        {!token ? (
         <Login />
        ): (
          <>
          <StyledLogoutButton onClick={logout}>Log Out</StyledLogoutButton>
          <Router>
            <ScrollToTop />
             <Routes>
                <Route path='/top-artists' element={<TopArtists />}></Route>
                <Route path='/top-tracks' element={<TopTracks />}></Route>
                <Route path='/playlists/:id' element={<h1>Playlist</h1>}></Route>
                <Route path='/playlists' element= {<h1>Playlists</h1>}></Route>
                <Route path='/' element= { <Profile />}></Route>
            </Routes>
          </Router>
         </>
        )}

    </div>
  );
}

export default App;
