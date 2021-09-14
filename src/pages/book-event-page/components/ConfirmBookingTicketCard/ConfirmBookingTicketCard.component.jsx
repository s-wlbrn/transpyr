import React from 'react';
import CustomTable from '../../../../components/CustomTable/CustomTable.component';

import './ConfirmBookingTicketCard.styles.scss';

export const ConfirmBookingTicketCard = ({ ticket, quantity }) => (
  <CustomTable.TableRow className="confirm-booking-ticket-card">
    <CustomTable.TableData xs={6}>{ticket.tierName}</CustomTable.TableData>
    <CustomTable.TableData xs={3}>{quantity}</CustomTable.TableData>
    <CustomTable.TableData xs={3}>{`$${ticket.price}`}</CustomTable.TableData>
  </CustomTable.TableRow>
);
