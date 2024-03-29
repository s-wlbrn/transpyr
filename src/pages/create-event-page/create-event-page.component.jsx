import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useHistory, withRouter } from 'react-router-dom';

import API from '../../api';
import { useAuth } from '../../auth/use-auth';
import { combineDateTime } from '../../libs/formatDateTime';
import { validationSchemaArray } from '../../components/EventForm/EventForm.schema';
import { useResponse } from '../../libs/useResponse';
import { processEventOnlineOnly } from '../../libs/processEventOnlineOnly';

import { EventForm } from '../../components/EventForm/EventForm.component';
import { CustomButton } from '../../components/CustomButton/CustomButton.component';
import { ResponseMessage } from '../../components/ResponseMessage/ResponseMessage.component';

import './create-event-page.styles.scss';

const CreateEventPage = () => {
  const [event, setEvent] = useState({
    name: '',
    description: '',
    ticketTiers: [],
    address: undefined,
    location: undefined,
    dateStart: undefined,
    dateEnd: undefined,
    timeStart: undefined,
    timeEnd: undefined,
    type: undefined,
    category: undefined,
    totalCapacity: undefined,
    locationValid: false,
    onlineOnly: false,
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const { token } = useAuth();
  const history = useHistory();
  const { response, createResponse, clearResponse } = useResponse();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setEvent({
      ...event,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      setSubmitting(true);
      //create dateTimeStart and dateTimeEnd fields
      let formattedEvent = combineDateTime({ ...event });
      //delete unnecessary fields
      delete formattedEvent.locationValid;
      delete formattedEvent.capacitiesValid;
      delete formattedEvent.onlineOnly;

      const response = await new API(token).createEvent(formattedEvent);
      history.push(`/events/id/${response.id}/upload-photo`);
    } catch (err) {
      return Promise.reject(err);
    } finally {
      setSubmitting(false);
    }
  };

  const _prev = () => {
    const prevStep = currentStep <= 1 ? 1 : currentStep - 1;
    setCurrentStep(prevStep);
    clearResponse();
  };

  const _next = async () => {
    try {
      await validationSchemaArray[currentStep - 1].validate(event, {
        abortEarly: false,
      });
      //check for onlineOnly if ticketTiers step
      if (currentStep === 4) {
        const updatedEvent = processEventOnlineOnly(event);
        setEvent(updatedEvent);
      }
      //submit if last step, otherwise go to next step
      if (currentStep === 5) {
        await handleSubmit();
      } else {
        const nextStep = currentStep >= 4 ? 5 : currentStep + 1;
        setCurrentStep(nextStep);
        clearResponse();
      }
    } catch (err) {
      createResponse(err);
    }
  };

  return (
    <Container as="main" className="create-event-page" fluid>
      <Row as="header">
        <Col xs={12}>
          <h1 className="create-event-title">Create an event</h1>
        </Col>
      </Row>
      <form className="create-event-form" id="create-event">
        <EventForm
          event={event}
          step={currentStep}
          handleChange={handleChange}
        />
        <Row>
          <Col xs={6}>
            {currentStep > 1 ? (
              <CustomButton type="button" onClick={_prev}>
                Previous
              </CustomButton>
            ) : null}
          </Col>
          <Col xs={6}>
            <CustomButton type="button" submitting={submitting} onClick={_next}>
              {currentStep < 5 ? 'Next' : 'Submit'}
            </CustomButton>
          </Col>
          <Col xs={12}>
            <ResponseMessage response={response} />
          </Col>
        </Row>
      </form>
    </Container>
  );
};

export default withRouter(CreateEventPage);
