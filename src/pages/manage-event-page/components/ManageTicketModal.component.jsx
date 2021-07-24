import React, { useState } from 'react';
import { Col, Container, Modal, Row } from 'react-bootstrap';
import { useRouteMatch } from 'react-router';

import API from '../../../api';
import { useAuth } from '../../../auth/use-auth';
import { useResponse } from '../../../libs/useResponse';

import { CustomButton } from '../../../components/CustomButton/CustomButton.component';
import { ManageTicketAlert } from './ManageTicketAlert.component';

import './ManageTicketModal.styles.scss';

export const ManageTicketModal = ({
  ticket,
  clearTicket,
  cancelTicketDisplay,
  checkActiveTickets,
}) => {
  const [showAlert, setShowAlert] = useState(null);
  const { response, createResponse } = useResponse();
  const match = useRouteMatch();
  const { token } = useAuth();

  const cancelTicket = async () => {
    try {
      await new API(token).cancelTicket(match.params.id, ticket.id);
      cancelTicketDisplay();
      clearTicket();
    } catch (err) {
      createResponse(err);
    }
  };

  const validateCancelTicket = () => {
    const alertValue = checkActiveTickets() > 1 ? 'confirm' : 'reject';
    setShowAlert(alertValue);
  };

  return (
    <Modal show={true} onHide={clearTicket} className="manage-ticket-modal">
      <Modal.Header closeButton>
        <Modal.Title>{`Managing "${ticket.tierName}"`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <ManageTicketAlert
            showAlert={showAlert}
            response={response}
            clearTicket={clearTicket}
            cancelTicket={cancelTicket}
          />
          <Row>
            {ticket.canceled && (
              <Col xs={12} className="manage-ticket-modal-canceled">
                Canceled
              </Col>
            )}
            <Col xs={12}>
              <h2>Description</h2>
              <p>{ticket.tierDescription}</p>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <h2>Price</h2>
              {ticket.price}
            </Col>
            <Col xs={6}>
              <h2>Limit Per Customer</h2>
              {ticket.limitPerCustomer}
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <h2>Capacity</h2>
              {ticket.capacity}
            </Col>
            <Col xs={6}>
              <h2>Bookings</h2>
              {ticket.numBookings.length}
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      {!showAlert && (
        <Modal.Footer className="manage-ticket-modal-footer">
          {!ticket.canceled && (
            <CustomButton type="button" warning onClick={validateCancelTicket}>
              Cancel ticket
            </CustomButton>
          )}
          <CustomButton type="button" onClick={clearTicket}>
            Close
          </CustomButton>
        </Modal.Footer>
      )}
    </Modal>
  );
};
