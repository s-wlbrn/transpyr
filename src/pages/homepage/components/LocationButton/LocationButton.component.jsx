import React from 'react';

import './LocationButton.styles.scss';

export const LocationButton = (props) => (
  <button className="location-button" type="button">
    {props.name}
  </button>
);
