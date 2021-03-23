import { format, parseISO, formatISO } from 'date-fns';

export const combineDateTime = (eventObj) => {
  const { dateStart, timeStart, dateEnd, timeEnd, ...restEvent } = eventObj;
  const dateTimeStart = formatISO(new Date(`${dateStart}T${timeStart}`));
  const dateTimeEnd = formatISO(new Date(`${dateEnd}T${timeEnd}`));

  const newEvent = {
    ...restEvent,
    dateTimeStart,
    dateTimeEnd,
  };

  return newEvent;
};

export const splitDateTime = (eventObj) => {
  let { dateTimeStart, dateTimeEnd } = eventObj;
  dateTimeStart = parseISO(dateTimeStart);
  dateTimeEnd = parseISO(dateTimeEnd);

  const dateStart = format(dateTimeStart, 'y-MM-d');
  const timeStart = format(dateTimeStart, 'HH:mm');
  const dateEnd = format(dateTimeEnd, 'y-MM-d');
  const timeEnd = format(dateTimeEnd, 'HH:mm');

  const newEvent = {
    ...eventObj,
    dateTimeStart,
    dateTimeEnd,
    dateStart,
    timeStart,
    dateEnd,
    timeEnd,
  };

  return newEvent;
};
