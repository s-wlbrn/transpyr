import React from 'react';
import { Alert } from 'react-bootstrap';
import { ResponseMessage } from '../../../components/ResponseMessage/ResponseMessage.component';
import { CustomButton } from '../../../components/CustomButton/CustomButton.component';

export const ManageTicketAlert = ({
  showAlert,
  response,
  clearTicket,
  cancelTicket,
}) => {
  return (
    <Alert variant="danger" show={!!showAlert}>
      <Alert.Heading>
        {showAlert === 'confirm'
          ? 'Cancel ticket type?'
          : 'Cannot cancel ticket'}
      </Alert.Heading>
      <p>
        {showAlert === 'confirm'
          ? 'Canceling a ticket type triggers a refund of everyone who has already booked it.'
          : 'Because this ticket is the last active one for the event, it cannot be canceled. If necessary, click the "Cancel Event" to cancel the event'}
      </p>
      <hr />
      <div className="confirm-cancel-buttons">
        <CustomButton type="button" onClick={clearTicket}>
          Go back
        </CustomButton>
        {showAlert === 'confirm' && (
          <CustomButton type="submit" warning onClick={cancelTicket}>
            Confirm cancel
          </CustomButton>
        )}
        <ResponseMessage response={response} />
      </div>
    </Alert>
  );
};
