import formatISO from 'date-fns/formatISO';

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
