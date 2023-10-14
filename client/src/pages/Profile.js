import React from "react";
import { catchErrors } from "../utils";
import { getCurrentUserProfile } from "../Spotify";

function Profile() {
 const [profile, setProfile] = React.useState(null);

 React.useEffect(() => {
    async function fetchData() {
        const {data} = await getCurrentUserProfile();
        setProfile(data);
    };
    catchErrors(fetchData());
 }, []);

 return (
    <>
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
 )
}

export default Profile;