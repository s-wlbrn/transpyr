import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useHistory, useRouteMatch } from 'react-router';
import myAxios from '../../../auth/axios.config';
import { useAuth } from '../../../auth/use-auth';
import { CustomButton } from '../../../components/CustomButton/CustomButton.component';
import { ResponseMessage } from '../../../components/ResponseMessage/ResponseMessage.component';

import './ManageTicketModal.styles.scss';

export const ConfirmDeleteModal = () => {
  const history = useHistory();
  const match = useRouteMatch();
  const [response, setResponse] = useState({
    error: false,
    message: '',
  });
  const { token } = useAuth();

  const handleClose = () => {
    history.push(`/events/id/${match.params.id}/manage`);
  };

  const cancelEvent = async () => {
    try {
      await myAxios(token).delete(
        `http://localhost:3000/api/events/${match.params.id}/`
      );

      history.push('/events/my-events');
    } catch (err) {
      setResponse({
        error: true,
        message: err.response.data.message,
      });
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
        {response.message && (
          <ResponseMessage error={response.error}>
            {response.message}
          </ResponseMessage>
        )}
        <CustomButton type="button" onClick={handleClose}>
          Close
        </CustomButton>
      </Modal.Footer>
    </Modal>
  );
};
