import { eventBuilder } from './eventBuilder';
import { userBuilder } from './userBuilder';

export const mockEvents = (num, settings) => {
  if (num === 1) {
    return eventBuilder(settings);
  }
  return new Array(num).fill(null).map(() => eventBuilder(settings));
};

export const mockUsers = (num, settings) => {
  if (num === 1) {
    return userBuilder(settings);
  }
  return new Array(num).fill(null).map(() => userBuilder(settings));
};
