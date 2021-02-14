import React from 'react';

import Spinner from 'react-bootstrap/Spinner';

import './LoadingResource.styles.scss';

export const LoadingResource = ({ resource }) => (
  <div className="loading-resource">
    <Spinner animation="border" className="loading-spinner" />
    <p className="loading-text">{`Loading ${resource}...`}</p>
  </div>
);
