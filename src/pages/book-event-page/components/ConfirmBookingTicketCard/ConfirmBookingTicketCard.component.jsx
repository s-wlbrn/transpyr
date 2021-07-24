import React from 'react';

import './ConfirmBookingTicketCard.styles.scss';

export const ConfirmBookingTicketCard = ({ ticket, quantity }) => (
  <tr className="confirm-booking-ticket-card">
    <td xs={6}>{ticket.tierName}</td>
    <td xs={3}>{quantity}</td>
    <td xs={3}>{`$${ticket.price}`}</td>
  </tr>
);
