export const calculateTotalCapacity = (ticketTiers) => {
  let totalCapacity = 0;
  for (const tier of ticketTiers) {
    //if any tiers have unlimited capacity, total will be unlimited
    if (tier.capacity === 0) {
      return 0;
    }
    //otherwise add the capacity of each tier
    totalCapacity += tier.capacity;
  }
  return totalCapacity;
};

export const calculateTotalBookings = (ticketTiers) => {
  return ticketTiers.reduce((acc, curr) => {
    return acc + curr.numBookings;
  }, 0);
};

export const calculateSoldOut = (ticketTiers) => {
  return ticketTiers.every((tier) => tier.ticketSoldOut);
};
