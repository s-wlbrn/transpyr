import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

import './LoadingSpinner.styles.scss';

export const LoadingSpinner = () => {
  return <Spinner animation="border" className="loading-spinner" />;
};
