import React from 'react';

import './EventThumbnail.styles.scss';

export const EventThumbnail = ({ src }) => (
  <img className="event-thumbnail" src={src} alt="event" />
);
