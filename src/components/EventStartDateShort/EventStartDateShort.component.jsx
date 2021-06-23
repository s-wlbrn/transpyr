import React from 'react';
import format from 'date-fns/format';

import './EventStartDateShort.styles.scss';

export const EventStartDateShort = ({ dateTimeStart }) => (
  <time className="event-short-date" dateTime={dateTimeStart}>
    {format(dateTimeStart, 'eee Pp')}
  </time>
);
