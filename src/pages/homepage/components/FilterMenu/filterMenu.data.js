import { eventTypes } from '../../../../libs/eventTypes';
import { eventCategories } from '../../../../libs/eventCategories';

import {
  endOfDay,
  startOfDay,
  endOfTomorrow,
  isSunday,
  isWeekend,
  nextSaturday,
  nextSunday,
  startOfTomorrow,
} from 'date-fns';

export const menuItems = {
  Date: ['Today', 'Tomorrow', 'This weekend'],
  Category: eventCategories,
  Type: eventTypes,
  Language: ['English'],
};

export const dateMenuMap = {
  Today: {
    'dateTimeStart[gte]': Date.now(),
    'dateTimeStart[lte]': endOfDay(Date.now()),
  },
  Tomorrow: {
    'dateTimeStart[gte]': startOfTomorrow(),
    'dateTimeStart[lte]': endOfTomorrow(),
  },
  'This weekend': {
    'dateTimeStart[gte]': isWeekend(Date.now())
      ? Date.now()
      : startOfDay(nextSaturday(Date.now())),
    'dateTimeStart[lte]': isSunday(Date.now())
      ? endOfDay(Date.now())
      : endOfDay(nextSunday(Date.now())),
  },
};
