import React from 'react';
import CustomTable from '../../../components/CustomTable/CustomTable.component';
import { ManageTicketRow } from './ManageTicketRow.component';

export const ManageTicketTable = ({ ticketTiers, handleClick }) => {
  return (
    <CustomTable className="manage-ticket-table" grow>
      <thead>
        <CustomTable.TableRow className="manage-ticket-table-header">
          <CustomTable.TableHeader xs={8}>Ticket Name</CustomTable.TableHeader>
          <CustomTable.TableHeader xs={4} centered>
            Bookings
          </CustomTable.TableHeader>
        </CustomTable.TableRow>
      </thead>
      <tbody>
        {ticketTiers.map((ticket, i) => (
          <ManageTicketRow
            key={ticket.id}
            ticket={ticket}
            index={i}
            handleClick={handleClick}
          />
        ))}
      </tbody>
    </CustomTable>
  );
};
