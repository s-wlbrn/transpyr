import React from 'react';

import './EventDescription.styles.scss';

export const EventDescription = ({ convertedDescription }) => (
  <div
    className="event-description"
    dangerouslySetInnerHTML={{ __html: convertedDescription }}
  ></div>
);
