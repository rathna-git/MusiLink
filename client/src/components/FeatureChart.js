import React from 'react';
import PropTypes from 'prop-types';
import Chart from 'chart.js';

import styled from 'styled-components';
import {theme} from '../styles';
const {fonts} = theme;

const properties = [
    'acousticness',
    'danceability',
    'energy',
    'instrumentalness',
    'liveness',
    'speechiness',
    'valence',
  ];
  
  const Container = styled.div`
    position: relative;
    width: 100%;
    max-width: 700px;
  
    #chart {
      margin: 0 auto;
      margin-top: -30px;
    }
  `;


const FeatureChart = props => {
    return(
        <>
        </>
    )
}

export default FeatureChart;