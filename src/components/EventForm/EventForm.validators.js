export const totalTicketCapacities = (tickets) => {
  return tickets.reduce((acc, ticket) => {
    return acc + ticket.capacity;
  }, 0);
};

export const allTicketsLimited = (tickets) => {
  return tickets.every((ticket) => {
    return ticket.capacity > 0;
  });
};

export const uniqueTicketNames = function (tickets) {
  const ticketMap = {};
  let unique = true;
  tickets.forEach((ticket) => {
    const formattedName = ticket.tierName.trim().toLowerCase();
    if (ticketMap[formattedName]) {
      unique = false;
      return;
    }
    ticketMap[formattedName] = true;
  });
  return unique;
};

export const ticketCapacitiesWithinTotal = function (tickets) {
  const ticketCapacities = totalTicketCapacities(tickets);
  const { totalCapacity } = this.parent;
  return totalCapacity === 0 || ticketCapacities <= totalCapacity;
};

export const noSpareTickets = function (tickets) {
  if (tickets.length === 0) {
    return true;
  }
  const ticketsLimited = allTicketsLimited(tickets);
  const ticketCapacities = totalTicketCapacities(tickets);
  const { totalCapacity } = this.parent;
  return (
    totalCapacity === 0 ||
    !ticketsLimited ||
    !(ticketCapacities < totalCapacity)
  );
};
