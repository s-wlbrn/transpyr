export const calculateEventInfo = (event) => {
  let tierPrices = event.ticketTiers.map((tier) => tier.price);

  //Get lowest ticket price, display + if higher-priced tickets offered
  tierPrices.sort(function (a, b) {
    return a - b;
  });
  let priceDisplay = tierPrices[0] ? `$${tierPrices[0]}` : 'Free';
  if (tierPrices.pop() > tierPrices[0]) priceDisplay += '+';

  //format dates
  const dateStartObj = new Date(event.dateTimeStart);
  const dateEndObj = new Date(event.dateTimeEnd);

  //flag if event has passed
  const pastEvent = dateStartObj < Date.now();

  const updatedEvent = {
    ...event,
    dateTimeStart: dateStartObj,
    dateTimeEnd: dateEndObj,
    priceDisplay,
    pastEvent,
  };
  return updatedEvent;
};
