import React from 'react';

import { Row, Col } from 'react-bootstrap';
import { CustomButton } from '../../../../components/CustomButton/CustomButton.component';
import { ResponseMessage } from '../../../../components/ResponseMessage/ResponseMessage.component';

import './EditEventControl.styles.scss';

export const EditEventControl = ({
  editStep,
  eventChanged,
  handleSubmit,
  handleDiscard,
  response,
  submitting,
}) => (
  <Row className="edit-event-control">
    <Col xs={6} className="edit-event-title">
      <h1>Editing event</h1>
      {!editStep && <h2>Select a field to edit.</h2>}
    </Col>
    {!editStep && (
      <React.Fragment>
        <Col xs={6} className="edit-event-buttons">
          {eventChanged && (
            <CustomButton
              type="button"
              submitting={submitting}
              onClick={handleSubmit}
            >
              Save Event
            </CustomButton>
          )}
          <CustomButton
            type="button"
            style={{ background: 'darkred' }}
            onClick={handleDiscard}
          >
            {eventChanged ? 'Discard Changes' : 'Cancel'}
          </CustomButton>
        </Col>
        <ResponseMessage response={response} />
      </React.Fragment>
    )}
  </Row>
);
