import { isOnlineOnly } from './isOnlineOnly';

export const processEventOnlineOnly = (event) => {
  debugger;
  const onlineOnly = isOnlineOnly(event.ticketTiers);
  console.log(event.onlineOnly, onlineOnly, event.locationValid);
  return {
    ...event,
    onlineOnly,
    //clear location fields if event is online only
    address: onlineOnly ? undefined : event.address,
    location: onlineOnly ? undefined : event.location,
    //only update locationValid if onlineOnly status has changed
    locationValid:
      event.onlineOnly !== onlineOnly ? onlineOnly : event.locationValid,
  };
};
