import React from 'react';

import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner.component';

import './LoadingResource.styles.scss';

export const LoadingResource = ({ page, children }) => (
  <div className={`loading ${page ? 'loading-page' : ''}`}>
    <LoadingSpinner />
    <p className="loading-text">{children}</p>
  </div>
);
