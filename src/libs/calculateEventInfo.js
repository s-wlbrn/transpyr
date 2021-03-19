export const calculateEventInfo = (event) => {
  let isOnline = false;
  // let totalCapacity = 0;

  //Flag event 'online' if any ticket tier online
  event.ticketTiers.forEach((tier) => {
    //   totalCapacity += tier.capacity;
    if (tier.online === true) isOnline = true;
  });

  const dateStartObj = new Date(event.dateTimeStart);
  const dateEndObj = new Date(event.dateTimeEnd);

  const updatedEvent = {
    ...event,
    dateTimeStart: dateStartObj,
    dateTimeEnd: dateEndObj,
    // capacity: totalCapacity,
    online: isOnline,
    // price: priceDisplay,
  };
  return updatedEvent;
};
