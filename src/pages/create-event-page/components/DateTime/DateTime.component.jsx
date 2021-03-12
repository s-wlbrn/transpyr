import React from 'react';
import { Col, Row } from 'react-bootstrap';

import { DateTimeInput } from '../../../../components/DateTimeInput/DateTimeInput.component';
import { FormInput } from '../../../../components/FormInput/FormInput.component';

import './DateTime.styles.scss';

export const DateTime = (props) => {
  return (
    <React.Fragment>
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
            value={props.dateStart}
            handleChange={props.handleChange}
            required
          />
          <label htmlFor={'start-time'} className="date-input-label">
            Start Time
          </label>
          <FormInput
            name="timeStart"
            type="time"
            id="start-time"
            value={props.timeStart}
            handleChange={props.handleChange}
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
            min={props.dateStart}
            value={props.dateEnd || props.dateStart}
            handleChange={props.handleChange}
          />
          <label htmlFor={'end-time'} className="date-input-label">
            End Time
          </label>
          <FormInput
            name="timeEnd"
            type="time"
            id="end-time"
            min={!props.dateEnd ? props.timeStart : null}
            value={props.timeEnd}
            handleChange={props.handleChange}
            required
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};
