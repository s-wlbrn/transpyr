import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useHistory, withRouter } from 'react-router-dom';

import API from '../../api';
import { useAuth } from '../../auth/use-auth';
import { combineDateTime } from '../../libs/formatDateTime';
import { validationSchemaArray } from '../../components/EventForm/EventForm.schema';
import { useResponse } from '../../libs/useResponse';
import { isOnlineOnly } from '../../libs/isOnlineOnly';

import { EventForm } from '../../components/EventForm/EventForm.component';
import { CustomButton } from '../../components/CustomButton/CustomButton.component';
import { ResponseMessage } from '../../components/ResponseMessage/ResponseMessage.component';

import './create-event-page.styles.scss';

const CreateEventPage = () => {
  const [event, setEvent] = useState({
    name: '',
    description: '',
    ticketTiers: [],
    address: '',
    location: {
      type: 'Point',
      coordinates: [],
    },
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
  const { token } = useAuth();
  const history = useHistory();
  const { response, createResponse, clearResponse } = useResponse();

  useEffect(() => {
    setEvent((event) => ({
      ...event,
      onlineOnly: isOnlineOnly(event.ticketTiers) ? true : false,
    }));
  }, [event.ticketTiers]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setEvent({
      ...event,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    try {
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
      <Row>
        <Col xs={12}>
          <h1 className="create-event-title">Create an event</h1>
        </Col>
      </Row>
      <form id="create-event-form">
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
            <CustomButton type="button" onClick={_next}>
              {currentStep < 5 ? 'Next' : 'Submit'}
            </CustomButton>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <ResponseMessage response={response} />
          </Col>
        </Row>
      </form>
    </Container>
  );
};

export default withRouter(CreateEventPage);
