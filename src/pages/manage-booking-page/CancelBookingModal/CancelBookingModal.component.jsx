import React from 'react';
import { Alert, Modal } from 'react-bootstrap';
import { ResponseMessage } from '../../../components/ResponseMessage/ResponseMessage.component';
import { CustomButton } from '../../../components/CustomButton/CustomButton.component';

import './CancelBookingModal.styles.scss';
import { FormInputTextArea } from '../../../components/FormInputTextArea/FormInputTextArea.components';

export const CancelBookingModal = ({
  showModal,
  response,
  cancelationReason,
  handleChangeReason,
  refundPolicy,
  clearModal,
  requestRefund,
}) => {
  return (
    <Modal
      show={showModal}
      onHide={clearModal}
      className="confirm-cancel-booking-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Request booking cancelation?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Alert variant="danger" show={true}>
          <p>
            Requesting a cancelation does not guarantee your booking will be
            refunded. Refunds are issued at the event organizer's discretion,
            according to the event's refund policy.
          </p>
        </Alert>
        <h2>Event refund policy</h2>
        <p>{refundPolicy}</p>
        <h2>Cancelation reason (optional)</h2>
        <p>
          You can state a reason for the cancelation here. (Max 150 characters)
        </p>
        <FormInputTextArea
          label="Cancelation Reason"
          onChange={handleChangeReason}
          value={cancelationReason}
          maxLength={150}
          rows={4}
        />
      </Modal.Body>
      <Modal.Footer>
        <div className="confirm-cancel-buttons">
          <CustomButton type="button" onClick={clearModal}>
            Go back
          </CustomButton>
          <CustomButton type="submit" warning onClick={requestRefund}>
            Request cancelation
          </CustomButton>

          {response.message && (
            <ResponseMessage error={response.error}>
              {response.message}
            </ResponseMessage>
          )}
        </div>
      </Modal.Footer>
    </Modal>
  );
};
