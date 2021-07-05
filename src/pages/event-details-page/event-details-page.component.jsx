import React, { useEffect, useState } from 'react';
import { Route } from 'react-router';
import { useHistory } from 'react-router-dom';
import { useErrorHandler } from 'react-error-boundary';
import Container from 'react-bootstrap/Container';

import myAxios from '../../auth/axios.config';
import { useAuth } from '../../auth/use-auth';
import { calculateEventInfo } from '../../libs/calculateEventInfo';

import { EventBookingForm } from '../../components/EventBookingForm/EventBookingForm.component';
import { EventDetails } from '../../components/EventDetails/EventDetails.component';
import { LoadingResource } from '../../components/LoadingResource/LoadingResource.component';
import { OwnEventControl } from './components/OwnEventControl/OwnEventControl.component';

import './event-details-page.styles.scss';

const EventDetailsPage = ({ match }) => {
  const history = useHistory();
  const [event, setEvent] = useState(null);
  const { user } = useAuth();
  const handleError = useErrorHandler();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await myAxios().get(
          `http://localhost:3000/api/events/${match.params.id}`
        );
        const eventData = calculateEventInfo(response.data.data);

        if (
          (!eventData.published && !user) ||
          (!eventData.published && user._id !== eventData.organizer)
        ) {
          history.push('/events');
        }

        setEvent({ ...eventData });
      } catch (err) {
        handleError(err);
      }
    };
    fetchEvent();
  });

  const handleBookNow = () => {
    history.push(`/events/id/${match.params.id}/tickets`);
  };

  if (!event) return <LoadingResource>Loading event...</LoadingResource>;

  return (
    <Container as="main" className="event-details-page" fluid>
      {user
        ? user._id === event.organizer && (
            <OwnEventControl published={event.published} />
          )
        : null}
      <Route exact path={`${match.path}/tickets`}>
        {!event.canceled && !event.soldOut ? (
          <EventBookingForm
            eventName={event.name}
            eventPath={`/events/id/${match.params.id}/tickets`}
            ticketTiers={event.ticketTiers}
          />
        ) : null}
      </Route>
      <EventDetails {...event} handleBookNow={handleBookNow} />
    </Container>
  );
};

export default EventDetailsPage;
