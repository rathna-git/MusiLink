import React from 'react';
import { getTopArtists } from '../Spotify';
import { catchErrors } from '../utils';
import { ArtistsGrid, SectionWrapper, TimeRangeButtons, Loader } from '../components';

function TopArtists(){

    const [topArtists, setTopArtists] = React.useState(null);
    const [activeRange, setActiveRange] = React.useState('short');

    React.useEffect(() => {
        const fetchData = async() => {
            const {data} = await getTopArtists(`${activeRange}_term`);
            setTopArtists(data);
        };

        catchErrors(fetchData());
    }, [activeRange]);

    return(
        <main>
            <SectionWrapper title="Top Artists" breadcrumb={true}>
                <TimeRangeButtons
                    activeRange={activeRange}
                    setActiveRange={setActiveRange}
                />
                {topArtists && topArtists.items ? (
                    <ArtistsGrid artists ={topArtists.items} />
                ) : (
                    <Loader />
                )}
            </SectionWrapper>
        </main>
    )
};

export default TopArtists;