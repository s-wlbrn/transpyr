import { eventBuilder } from './eventBuilder';

export const mockEvents = (num) => {
  if (num === 1) {
    return eventBuilder();
  }
  return new Array(num).fill(null).map(() => eventBuilder());
};
