import React from 'react';

import ErrorPage from '../error-page/error-page.component';

import { calculateEventInfo } from '../../libs/calculateEventInfo';
import { handleHTTPError } from '../../libs/handleHTTPError';

import { EventDetails } from './components/EventDetails.component';
import { LoadingResource } from '../../components/LoadingResource/LoadingResource.component';

import Container from 'react-bootstrap/Container';

import './event-details-page.styles.scss';

class EventDetailsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      eventId: this.props.match.params.id,
      event: {},
      error: {},
    };
  }

  componentDidMount() {
    fetch(`http://localhost:3000/api/events/${this.state.eventId}`)
      .then((response) => response.json())
      .then((response) => handleHTTPError(response))
      .then((data) => {
        return calculateEventInfo(data.data.data);
      })
      .then((eventData) => {
        console.log(eventData);
        this.setState({
          event: {
            ...eventData,
          },
        });
      })
      .catch((err) => {
        this.setState({
          error: {
            ...err,
          },
        });
      });
  }

  render() {
    const { event, error } = this.state;
    const eventDisplay = !Object.keys(error).length ? (
      Object.keys(event).length ? (
        <EventDetails {...event} />
      ) : (
        <LoadingResource resource="event" />
      )
    ) : (
      <ErrorPage {...error} />
    );
    return (
      <Container as="main" className="event-details-page" fluid>
        {eventDisplay}
      </Container>
    );
  }
}

export default EventDetailsPage;
