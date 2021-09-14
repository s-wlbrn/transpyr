import React from 'react';
import CustomTable from '../../../components/CustomTable/CustomTable.component';

import './ManageTicketRow.styles.scss';

export const ManageTicketRow = ({ ticket, index, handleClick }) => {
  const { tierName, numBookings } = ticket;
  return (
    <CustomTable.TableRow
      className="manage-ticket-row"
      onClick={() => handleClick(index)}
    >
      <CustomTable.TableData xs={8}>{tierName}</CustomTable.TableData>
      <CustomTable.TableData xs={4} centered>
        {!ticket.canceled ? (
          numBookings.length
        ) : (
          <span className="manage-ticket-row-canceled">Canceled</span>
        )}
      </CustomTable.TableData>
    </CustomTable.TableRow>
  );
};
