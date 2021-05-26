import React from 'react';

import Spinner from 'react-bootstrap/Spinner';

import './LoadingResource.styles.scss';

export const LoadingResource = ({ children }) => (
  <div className="loading">
    <Spinner animation="border" className="loading-spinner" />
    <p className="loading-text">{children}</p>
  </div>
);
