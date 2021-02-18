import React from 'react';
import format from 'date-fns/format';

import './EventStartDateShort.styles.scss';

export const EventStartDateShort = ({ dateStart }) => (
  <time className="event-short-date" dateTime={dateStart}>
    {format(dateStart, 'eee Pp')}
  </time>
);
