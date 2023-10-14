import React from "react";
import { catchErrors } from "../utils";
import { getCurrentUserPlaylists, getCurrentUserProfile } from "../Spotify";
import { StyledHeader } from "../styles";


function Profile() {
 const [profile, setProfile] = React.useState(null);
 const [playlists, setPlaylists] = React.useState(null);

 React.useEffect(() => {
    async function fetchData() {
        const userProfile = await getCurrentUserProfile();
        setProfile(userProfile.data);

        const userPlaylists = await getCurrentUserPlaylists();
        setPlaylists(userPlaylists.data);
    };
    catchErrors(fetchData());
 }, []);

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
        </>
    )}
    </>
 )
};

export default Profile;