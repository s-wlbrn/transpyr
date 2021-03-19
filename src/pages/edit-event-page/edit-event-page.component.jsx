import React from 'react';
import { handleHTTPError } from '../../libs/handleHTTPError';
import { calculateEventInfo } from '../../libs/calculateEventInfo';

import { Col, Container, Row } from 'react-bootstrap';
import ErrorPage from '../error-page/error-page.component';
import { EventDetails } from '../../components/EventDetails/EventDetails.component';
import { LoadingResource } from '../../components/LoadingResource/LoadingResource.component';

import './edit-event-page.styles.scss';

class EditEventPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      eventId: this.props.match.params.id,
      event: null,
      error: null,
    };
  }

  handleEdit = (section) => {
    console.log(section);
  };

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

  renderEditEvent() {
    const { event } = this.state;
    return event ? (
      <React.Fragment>
        <Row>
          <Col xs={12} className="edit-event-title">
            <h1>{`Editing "${event.name}"`}</h1>
            <h2>{'Select a field to edit.'}</h2>
            <hr />
          </Col>
        </Row>
        <EventDetails editMode={true} handleEdit={this.handleEdit} {...event} />
      </React.Fragment>
    ) : (
      <LoadingResource resource="event" />
    );
  }

  render() {
    const { error } = this.state;
    const editEvent = this.renderEditEvent();
    return (
      <Container as="main" className="edit-event-page" fluid>
        {!error ? editEvent : <ErrorPage {...error} />}
      </Container>
    );
  }
}

export default EditEventPage;
