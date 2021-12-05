import { isOnlineOnly } from './isOnlineOnly';

export const processEventOnlineOnly = (event) => {
  const onlineOnly = isOnlineOnly(event.ticketTiers);
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
