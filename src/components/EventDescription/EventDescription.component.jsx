import React from 'react';

import './EventDescription.styles.scss';

export const EventDescription = ({ convertedDescription }) => (
  <p
    className="event-description"
    dangerouslySetInnerHTML={{ __html: convertedDescription }}
  ></p>
);
