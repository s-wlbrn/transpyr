import React from 'react';

import './CustomButton.styles.scss';

export const CustomButton = ({ children, warning, red, ...otherAttr }) => (
  <button
    className={`custom-button ${warning ? 'warning' : ''}`}
    {...otherAttr}
  >
    {red ? 'UPDATE ME TO WARNING' : null}
    {children}
  </button>
);
