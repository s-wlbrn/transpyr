import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useHistory, useRouteMatch } from 'react-router';

import API from '../../../api';
import { useAuth } from '../../../auth/use-auth';

import { CustomButton } from '../../../components/CustomButton/CustomButton.component';
import { ResponseMessage } from '../../../components/ResponseMessage/ResponseMessage.component';
import { useResponse } from '../../../libs/useResponse';

import './ManageTicketModal.styles.scss';

export const ConfirmDeleteModal = () => {
  const history = useHistory();
  const match = useRouteMatch();
  const { response, createResponse } = useResponse();
  const { token } = useAuth();

  const handleClose = () => {
    history.push(`/events/id/${match.params.id}/manage`);
  };

  const cancelEvent = async () => {
    try {
      await new API(token).cancelEvent(match.params.id);
      history.push('/events/my-events');
    } catch (err) {
      createResponse(err);
    }
  };

  return (
    <Modal show={true} onHide={handleClose} className="manage-ticket-modal">
      <Modal.Header closeButton>
        <Modal.Title>Cancel event?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to cancel this event? The event will remain
        published, but will be marked canceled and can no longer be booked.
        Everyone who has booked this event will be refunded automatically.
      </Modal.Body>
      <Modal.Footer>
        <CustomButton type="button" warning onClick={cancelEvent}>
          Cancel event
        </CustomButton>
        <ResponseMessage response={response} />
        <CustomButton type="button" onClick={handleClose}>
          Close
        </CustomButton>
      </Modal.Footer>
    </Modal>
  );
};
