import React from 'react';
import { Col, Row } from 'react-bootstrap';

import './ManageTicketRow.styles.scss';

export const ManageTicketRow = ({ ticket, index, handleClick }) => {
  const { tierName, numBookings } = ticket;
  return (
    <Row
      as="tr"
      className="manage-ticket-row"
      onClick={() => handleClick(index)}
    >
      <Col as="td" xs={8}>
        {tierName}
      </Col>
      <Col as="td" xs={4}>
        {!ticket.canceled ? (
          numBookings.length
        ) : (
          <span className="manage-ticket-row-canceled">Canceled</span>
        )}
      </Col>
    </Row>
  );
};
