import React from "react";
import PropTypes from 'prop-types'
import { getTrackInfo } from "../Spotify";
import { formatDuration, getYear, parsePitchClass, catchErrors } from "../utils";

import FeatureChart from "../components/FeatureChart";
import { Loader } from "../components";

import styled from 'styled-components/macro';
import {theme, mixins, media, Main} from '../styles';

const {colors, fontSizes} = theme;

const TrackContainer = styled.div`
  display: flex;
  margin-bottom: 70px;
  ${media.phablet`
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;
  `};
`;

const Artwork = styled.div`
  ${mixins.coverShadow};
  max-width: 250px;
  margin-right: 40px;
  ${media.tablet`
    max-width: 200px;
  `};
  ${media.phablet`
    margin: 0 auto;
  `};
`;

const Track = (props) => {
   const { trackId } = props;

  const [track, setTrack] = React.useState(null);
  const [audioAnalysis, setAudioAnalysis] = React.useState(null);
  const [audioFeatures, setAudioFeatures] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await getTrackInfo(trackId);
      setTrack(data.track);
      setAudioAnalysis(data.audioAnalysis);
      setAudioFeatures(data.audioFeatures);
    };
    catchErrors(fetchData());
  }, [trackId]);

  console.log(track);
  
 return(
    <>
    {track ? (
        <Main>
            <TrackContainer>
                <Artwork>
                    <img src={track.album.images[0].url} alt="Album Artwork" />
                </Artwork>
            </TrackContainer>
        </Main>
    ) : <Loader/>}
    </>
 )
}

export default Track;