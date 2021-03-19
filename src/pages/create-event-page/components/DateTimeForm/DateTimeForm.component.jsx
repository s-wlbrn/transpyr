import React from 'react';

import { Col, Container, Row } from 'react-bootstrap';

import { FormInput } from '../../../../components/FormInput/FormInput.component';

import './DateTimeForm.styles.scss';

export const DateTimeForm = ({
  dateStart,
  timeStart,
  dateEnd,
  timeEnd,
  handleChange,
}) => {
  return (
    <Container fluid className="date-time-form">
      <Row className="date-time-input-group">
        <Col xs={12}>
          <h2>Enter the date and time for your event.</h2>
          <label htmlFor={'start-date'} className="date-input-label">
            Start Date
          </label>
          <FormInput
            name="dateStart"
            type="date"
            id="start-date"
            min={Date.now()}
            value={dateStart}
            handleChange={handleChange}
            required
          />
          <label htmlFor={'start-time'} className="date-input-label">
            Start Time
          </label>
          <FormInput
            name="timeStart"
            type="time"
            id="start-time"
            value={timeStart}
            handleChange={handleChange}
            required
          />
        </Col>
        <Col xs={12}>
          <label htmlFor={'end-date'} className="date-input-label">
            End Date
          </label>
          <FormInput
            name="dateEnd"
            type="date"
            id="end-date"
            min={dateStart}
            value={dateEnd || dateStart}
            handleChange={handleChange}
          />
          <label htmlFor={'end-time'} className="date-input-label">
            End Time
          </label>
          <FormInput
            name="timeEnd"
            type="time"
            id="end-time"
            min={!dateEnd ? timeStart : null}
            value={timeEnd}
            handleChange={handleChange}
            required
          />
        </Col>
      </Row>
    </Container>
  );
};
