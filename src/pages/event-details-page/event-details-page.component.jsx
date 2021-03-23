import React from 'react';

import { calculateEventInfo } from '../../libs/calculateEventInfo';
import { handleHTTPError } from '../../libs/handleHTTPError';

import ErrorPage from '../error-page/error-page.component';
import { EventDetails } from '../../components/EventDetails/EventDetails.component';
import { LoadingResource } from '../../components/LoadingResource/LoadingResource.component';
import { OwnEventControl } from './components/OwnEventControl/OwnEventControl.component';

import Container from 'react-bootstrap/Container';

import './event-details-page.styles.scss';

class EventDetailsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      eventId: this.props.match.params.id,
      event: null,
      error: null,
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
    const { error, event } = this.state;

    if (error) return <ErrorPage {...error} />;
    if (!event) return <LoadingResource resource="event" />;

    return (
      <Container as="main" className="event-details-page" fluid>
        <OwnEventControl published={event.published} />
        <EventDetails {...event} />
      </Container>
    );
  }
}

export default EventDetailsPage;
