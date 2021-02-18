import React from 'react';
import { format, isSameDay } from 'date-fns';

import './EventDetailsDate.styles.scss';

export const EventDetailsDate = ({ dateStart, dateEnd }) => {
  const dateDisplay = isSameDay(dateStart, dateEnd) ? (
    <p>
      <time dateTime={dateStart}>{format(dateStart, 'PPPP')}</time>
      <br />
      <time dateTime={dateStart}>{format(dateStart, 'p')}</time> to{' '}
      <time dateTime={dateEnd}>{format(dateEnd, 'p O')}</time>
    </p>
  ) : (
    <p>
      <time dateTime={dateStart}>{format(dateStart, 'PPPPp')}</time> -<br />
      <time dateTime={dateEnd}>{format(dateEnd, 'PPPPp')}</time>
    </p>
  );

  return [dateDisplay];
};
