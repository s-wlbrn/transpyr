import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

import './LoadingSpinner.styles.scss';

export const LoadingSpinner = () => {
  return (
    <Spinner
      animation="border"
      role="alert"
      aria-busy="true"
      className="loading-spinner"
    />
  );
};
