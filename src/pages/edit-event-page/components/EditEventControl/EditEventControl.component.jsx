import React from 'react';

import { Row, Col } from 'react-bootstrap';
import { CustomButton } from '../../../../components/CustomButton/CustomButton.component';

import './EditEventControl.styles.scss';

export const EditEventControl = ({
  editStep,
  eventChanged,
  handleSubmit,
  handleDiscard,
}) => (
  <Row className="edit-event-control">
    <Col xs={6} className="edit-event-title">
      <h1>Editing event</h1>
      {!editStep && <h2>Select a field to edit.</h2>}
    </Col>
    {!editStep && (
      <Col xs={6} className="edit-event-buttons">
        {eventChanged && (
          <CustomButton type="button" onClick={handleSubmit}>
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
    )}
  </Row>
);
