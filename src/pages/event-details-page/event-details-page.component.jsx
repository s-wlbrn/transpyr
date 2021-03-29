import React from 'react';

import myAxios from '../../auth/axios.config';
import authContext from '../../auth/use-auth';
import { calculateEventInfo } from '../../libs/calculateEventInfo';

import ErrorPage from '../error-page/error-page.component';
import { EventDetails } from '../../components/EventDetails/EventDetails.component';
import { LoadingResource } from '../../components/LoadingResource/LoadingResource.component';
import { OwnEventControl } from './components/OwnEventControl/OwnEventControl.component';

import Container from 'react-bootstrap/Container';

import './event-details-page.styles.scss';

class EventDetailsPage extends React.Component {
  static contextType = authContext;
  constructor(props) {
    super(props);

    this.state = {
      eventId: this.props.match.params.id,
      event: null,
      error: null,
      ownEvent: false,
    };
  }

  async componentDidMount() {
    try {
      const response = await myAxios().get(
        `http://localhost:3000/api/events/${this.state.eventId}`
      );
      const eventData = calculateEventInfo(response.data.data);
      this.setState({
        event: {
          ...eventData,
        },
      });
    } catch (err) {
      this.setState({
        error: {
          ...err.response.data,
        },
      });
    }
  }

  render() {
    const { error, event } = this.state;
    const { user } = this.context;

    if (error) return <ErrorPage {...error} />;
    if (!event) return <LoadingResource resource="event" />;

    return (
      <Container as="main" className="event-details-page" fluid>
        {user
          ? user._id === event.organizer && (
              <OwnEventControl published={event.published} />
            )
          : null}
        <EventDetails {...event} />
      </Container>
    );
  }
}

export default EventDetailsPage;
