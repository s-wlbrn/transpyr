import React from 'react';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner.component';

import './CustomButton.styles.scss';

export const CustomButton = ({
  children,
  warning,
  submitting,
  ...otherAttr
}) => (
  <div className="custom-button-container">
    {!submitting ? (
      <button
        className={`custom-button ${warning ? 'warning' : ''}`}
        {...otherAttr}
      >
        {children}
      </button>
    ) : (
      <LoadingSpinner />
    )}
  </div>
);
