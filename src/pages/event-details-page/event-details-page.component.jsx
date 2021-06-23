import React from 'react';
import { Route } from 'react-router';

import Container from 'react-bootstrap/Container';

import myAxios from '../../auth/axios.config';
import authContext from '../../auth/use-auth';
import { calculateEventInfo } from '../../libs/calculateEventInfo';

import ErrorPage from '../error-page/error-page.component';
import { EventBookingForm } from '../../components/EventBookingForm/EventBookingForm.component';
import { EventDetails } from '../../components/EventDetails/EventDetails.component';
import { LoadingResource } from '../../components/LoadingResource/LoadingResource.component';
import { OwnEventControl } from './components/OwnEventControl/OwnEventControl.component';

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

    this.eventPath = `/events/id/${this.state.eventId}`;
  }

  async componentDidMount() {
    try {
      const response = await myAxios().get(
        `http://localhost:3000/api/events/${this.state.eventId}`
      );
      const eventData = calculateEventInfo(response.data.data);

      if (
        (!eventData.published && !this.context.user) ||
        (!eventData.published && this.context.user._id !== eventData.organizer)
      ) {
        this.props.history.push('/events');
      }

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

  handleBookNow = () => {
    this.props.history.push(`${this.eventPath}/tickets`);
  };

  render() {
    const { error, event } = this.state;
    const { user } = this.context;

    if (error) return <ErrorPage {...error} />;
    if (!event) return <LoadingResource>Loading event...</LoadingResource>;

    return (
      <Container as="main" className="event-details-page" fluid>
        {user
          ? user._id === event.organizer && (
              <OwnEventControl published={event.published} />
            )
          : null}
        <Route exact path={`${this.props.match.path}/tickets`}>
          {!event.canceled && !event.soldOut ? (
            <EventBookingForm
              eventName={event.name}
              eventPath={this.eventPath}
              ticketTiers={event.ticketTiers}
            />
          ) : null}
        </Route>
        <EventDetails {...event} handleBookNow={this.handleBookNow} />
      </Container>
    );
  }
}

export default EventDetailsPage;
