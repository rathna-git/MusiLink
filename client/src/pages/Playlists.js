import React from "react";
import axios from 'axios';
import { getCurrentUserPlaylists } from "../Spotify";
import { catchErrors } from "../utils";
import { SectionWrapper, PlaylistsGrid, Loader } from "../components";

function Playlists(){
    const [playlistsData, setPlaylistsData] = React.useState(null);
    const [playlists, setPlaylists] = React.useState(null);

    React.useEffect(() => {
        const fetchData = async() => {
            const {data} = await getCurrentUserPlaylists();
            setPlaylistsData(data);
        };

        catchErrors(fetchData());
    }, []);

    //When playlistsData updates, check if there are more playlists to fetch
    // then update the state variable
    React.useEffect(() => {
        if(!playlistsData){
            return;
        }

        //Playlist endpoint only return 20 playlists at a time, so we need to make 
        //sure we get ALL playlists by fetching the next set of playlists
        const fetchMoreData = async() => {
            if(playlistsData.next) {
                const {data} = await axios.get(playlistsData.next);
                setPlaylistsData(data);
            }
        } 

        //Use functional update to update playlists state variable to avoid
        //including playlists as a dependency for this hook
        //and creating an infinite loop
        setPlaylists(playlists => ([
            ...playlists ? playlists : [],
            ...playlistsData.items
        ]));

        //Fetch next set of playlists as needed
        catchErrors(fetchMoreData());

    },[playlistsData]);

    return (
        <main>
            <SectionWrapper title="Public Playlists" breadcrumb={true}>
                {playlists ? (
                    <PlaylistsGrid playlists={playlists} />
                ) : (
                    <Loader />
                )}
            </SectionWrapper>
        </main>
    );
};

export default Playlists;