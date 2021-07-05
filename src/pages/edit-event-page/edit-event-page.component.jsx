import React, { useEffect, useState } from 'react';
import { splitDateTime, combineDateTime } from '../../libs/formatDateTime';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { useErrorHandler } from 'react-error-boundary';

import myAxios from '../../auth/axios.config';
import { useAuth } from '../../auth/use-auth';
import AppError from '../../libs/AppError';

import { EventDetails } from '../../components/EventDetails/EventDetails.component';
import { EventForm } from '../../components/EventForm/EventForm.component';
import { EditEventControl } from './components/EditEventControl/EditEventControl.component';
import { LoadingResource } from '../../components/LoadingResource/LoadingResource.component';
import { CustomButton } from '../../components/CustomButton/CustomButton.component';

import './edit-event-page.styles.scss';
import { validationSchemaArray } from '../../components/EventForm/EventForm.schema';
import { useResponse } from '../../libs/useResponse';
import { ResponseMessage } from '../../components/ResponseMessage/ResponseMessage.component';
import { isOnlineOnly } from '../../libs/isOnlineOnly';

const EditEventPage = () => {
  const { user, token } = useAuth();
  const [event, setEvent] = useState({});
  const [eventChanges, setEventChanges] = useState({});
  const [eventChanged, setEventChanged] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  const [editStep, setEditStep] = useState(null);
  const location = useLocation();
  const match = useRouteMatch();
  const history = useHistory();
  const handleError = useErrorHandler();
  const { response, createResponse, clearResponse } = useResponse();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await myAxios().get(
          `http://localhost:3000/api/events/${match.params.id}`
        );

        //handle unauthorized
        if (user._id !== response.data.data.organizer) {
          return handleError(
            new AppError('You are not the organizer of this event.', 403)
          );
        }
        const formattedData = splitDateTime(response.data.data);
        formattedData.locationValid = true;
        formattedData.capacitiesValid = true;
        formattedData.onlineOnly = isOnlineOnly(formattedData.ticketTiers);

        setEvent(formattedData);
        setEventChanges(formattedData);
        setDataFetched(true);
      } catch (err) {
        handleError(err);
      }
    };
    fetchEvent();
  }, [handleError, match.params.id, user._id]);

  const editStepMap = {
    name: 1,
    description: 2,
    date: 3,
    ticketTiers: 4,
    location: 5,
  };

  const handleEditStep = (section) => {
    if (section === 'photo')
      history.push(`/events/id/${match.params.id}/upload-photo`);
    setEditStep(section);
    clearResponse();
  };

  const handleChange = ({ target: { name, value } }) => {
    setEventChanges({
      ...eventChanges,
      [name]: value,
    });
  };

  const handleEditCancel = () => {
    setEventChanges({ ...event });
    setEditStep(null);
    clearResponse();
  };

  const handleEditSubmit = async () => {
    try {
      //validate step submitted
      await validationSchemaArray[editStepMap[editStep] - 1].validate(
        eventChanges,
        {
          abortEarly: false,
        }
      );
      //recheck for onlineOnly if ticketTiers step was submitted
      if (editStep === 'ticketTiers') {
        const onlineOnly = isOnlineOnly(eventChanges.ticketTiers);

        setEventChanges({
          ...eventChanges,
          onlineOnly,
          //clear location fields if event is online only
          address: onlineOnly ? undefined : eventChanges.address,
          location: onlineOnly
            ? { type: 'Point', coordinates: [] }
            : eventChanges.location,
          locationValid:
            event.onlineOnly !== onlineOnly && onlineOnly === false
              ? false
              : true,
        });
      }

      setEvent({
        ...combineDateTime(eventChanges),
      });
      setEventChanged(true);
      setEditStep(null);
      clearResponse();
    } catch (err) {
      createResponse(err);
    }
  };

  const handleDiscard = () => {
    // navigate to event page if no location state
    if (!location.state) {
      return history.push(`/events/id/${match.params.id}`);
    }
    // navigate to route stored in state or event page
    history.push(location.state.from || `/events/id/${match.params.id}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (event.locationValid === false) {
        throw new Error('Please specify an event location.');
      }

      //validate ticketTiers again
      await validationSchemaArray[3].validate(event, { abortEarly: false });

      await myAxios(token).put(
        `http://localhost:3000/api/events/${match.params.id}`,
        event
      );
      history.push(`/events/id/${match.params.id}`);
    } catch (err) {
      createResponse(err);
    }
  };

  if (!dataFetched) return <LoadingResource>Loading event...</LoadingResource>;

  return (
    <Container as="main" className="edit-event-page" fluid>
      <EditEventControl
        editStep={editStep}
        eventChanged={eventChanged}
        handleSubmit={handleSubmit}
        handleDiscard={handleDiscard}
        response={response}
      />
      {editStep ? (
        <form>
          <EventForm
            event={eventChanges}
            step={editStepMap[editStep]}
            handleChange={handleChange}
          />
          <Row>
            <Col xs={6}>
              <CustomButton type="button" onClick={handleEditCancel}>
                Cancel
              </CustomButton>
            </Col>
            <Col xs={6}>
              <CustomButton type="button" onClick={handleEditSubmit}>
                Submit
              </CustomButton>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <ResponseMessage response={response} />
            </Col>
          </Row>
        </form>
      ) : (
        <EventDetails
          editMode={true}
          handleEditStep={handleEditStep}
          {...event}
        />
      )}
    </Container>
  );
};

export default EditEventPage;
