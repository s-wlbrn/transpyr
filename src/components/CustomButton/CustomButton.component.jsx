import React from 'react';

import './CustomButton.styles.scss';

export const CustomButton = ({ children, ...otherAttr }) => (
  <button className="custom-button" {...otherAttr}>
    {children}
  </button>
);
