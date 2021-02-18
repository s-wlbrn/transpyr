export const calculateEventInfo = (event) => {
  let isOnline = false;
  let totalCapacity = 0;
  const prices = [];

  //Add up event capacities
  //Push tier price to prices array
  //Flag event 'online' if any ticket tier online
  event.priceTiers.forEach((tier) => {
    totalCapacity += tier.capacity;
    prices.push(tier.price);
    if (tier.online === true) isOnline = true;
  });

  prices.sort(function (a, b) {
    return a - b;
  });
  let priceDisplay = prices[0] ? `$${prices[0]}` : 'Free';
  if (prices.pop() > prices[0]) priceDisplay += '+';

  const dateStartObj = new Date(event.dateStart);
  const dateEndObj = new Date(event.dateEnd);

  const updatedEvent = {
    ...event,
    dateStart: dateStartObj,
    dateEnd: dateEndObj,
    capacity: totalCapacity,
    online: isOnline,
    price: priceDisplay,
  };
  return updatedEvent;
};
