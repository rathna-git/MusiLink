import React from "react";

import { catchErrors } from "../utils";
import { SectionWrapper, ArtistsGrid, TrackList, PlaylistsGrid, Loader } from "../components";
import { getCurrentUserPlaylists, getCurrentUserProfile, getTopArtists, getTopTracks } from "../Spotify";
import { StyledHeader } from "../styles";


function Profile() {
 const [profile, setProfile] = React.useState(null);
 const [playlists, setPlaylists] = React.useState(null);
 const [topArtists, setTopArtists] = React.useState(null);
 const [topTracks, setTopTracks] = React.useState(null);

 React.useEffect(() => {
    async function fetchData() {
        const userProfile = await getCurrentUserProfile();
        setProfile(userProfile.data);

        const userPlaylists = await getCurrentUserPlaylists();
        setPlaylists(userPlaylists.data);

        const userTopArtist = await getTopArtists();
        setTopArtists(userTopArtist.data);

        const userTopTracks = await getTopTracks();
        setTopTracks(userTopTracks.data);
    };

    catchErrors(fetchData());
 }, []);

 console.log(topTracks);

 return (
    <>
    {profile && (
        <>
            <StyledHeader type="user">
                <div className="header__inner">
                    {profile.images.length && profile.images[0].url && (
                    <img className="header__img" src={profile.images[0].url} alt="Avatar" />
                    )}
                    <div>
                        <div className="header__overline">Profile</div>
                        <h1 className="header__name">{profile.display_name}</h1>
                        <p className="header__meta">
                            {playlists && (
                                <span>{playlists.total} Playlist{playlists.total !== 1 ? 's' : ''}</span>
                            )}
                            <span>
                                {profile.followers.total} Follower{profile.followers.total !== 1 ? 's' : ''}
                            </span>
                        </p>
                    </div>
                </div>
            </StyledHeader>  

            
                <main>
                {topArtists &&  topTracks && playlists ? (
                    <>
                        <SectionWrapper title="Top artists this month" seeAllLink="/top-artists">
                            <ArtistsGrid artists={topArtists.items.slice(0, 10)} />
                        </SectionWrapper>

                        <SectionWrapper title="Top tracks this month" seeAllLink="/top-tracks">
                            <TrackList tracks={topTracks.items.slice(0, 10)} />
                        </SectionWrapper>

                        <SectionWrapper title="Playlists" seeAllLink="/playlists">
                            <PlaylistsGrid playlists={playlists.items.slice(0,10)}/>
                        </SectionWrapper>
                    </>
                ) : (
                    <Loader />
                )}
                </main>
        </>
    )}
    </>
 )
};

export default Profile;