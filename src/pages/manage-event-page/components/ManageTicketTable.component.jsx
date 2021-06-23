import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { ManageTicketRow } from './ManageTicketRow.component';

import './ManageTicketTable.styles.scss';

export const ManageTicketTable = ({ ticketTiers, handleClick }) => {
  return (
    <table className="manage-ticket-table">
      <thead>
        <Row as="tr" className="manage-ticket-table-header">
          <Col as="th" xs={8}>
            Ticket Name
          </Col>
          <Col as="th" xs={4}>
            Bookings
          </Col>
        </Row>
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
    </table>
  );
};
