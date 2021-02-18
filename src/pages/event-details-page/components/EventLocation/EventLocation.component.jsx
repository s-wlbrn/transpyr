import React from 'react';

import './EventLocation.styles.scss';

export const EventLocation = ({ locations, online, address }) => {
  const onlineDisplay = online ? <p>Online and</p> : null;
  const locationDisplay = locations.length ? (
    <React.Fragment>
      {onlineDisplay}
      <p className="event-details-address">{address}</p>
      <a href="#event-map">See Map</a>
    </React.Fragment>
  ) : (
    <p className="event-details-online">This is an online event.</p>
  );
  return [locationDisplay];
};
