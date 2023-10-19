import React from "react";
import {getTopTracks} from '../Spotify';
import { catchErrors } from "../utils";
import { SectionWrapper, TrackList, TimeRangeButtons, Loader } from "../components";


function TopTracks(){
    const [topTracks,setTopTracks] = React.useState(null);
    const [activeRange,setActiveRange] = React.useState('short');

    React.useEffect(() => {
        const fetchData = async() => {
            const {data} = await getTopTracks(`${activeRange}_term`);
            setTopTracks(data);
        }

        catchErrors(fetchData());
    },[activeRange]);


    return(
        <main>
            <SectionWrapper title="Top Tracks" breadcrumb={true}>
                <TimeRangeButtons 
                    activeRange={activeRange}
                    setActiveRange={setActiveRange}
                />
                {topTracks && topTracks.items ? (
                    <TrackList tracks={topTracks.items} />
                ): (
                    <Loader />
                )}
            </SectionWrapper>
        </main>
    );
};

export default TopTracks;