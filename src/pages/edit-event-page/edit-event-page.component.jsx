import React from 'react';
import { handleHTTPError } from '../../libs/handleHTTPError';
import { splitDateTime, combineDateTime } from '../../libs/formatDateTime';

import { Col, Container, Row } from 'react-bootstrap';
import ErrorPage from '../error-page/error-page.component';
import { EventDetails } from '../../components/EventDetails/EventDetails.component';
import { EventForm } from '../../components/EventForm/EventForm.component';
import { EditEventControl } from './components/EditEventControl/EditEventControl.component';
import { LoadingResource } from '../../components/LoadingResource/LoadingResource.component';
import { CustomButton } from '../../components/CustomButton/CustomButton.component';

import './edit-event-page.styles.scss';

class EditEventPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      eventId: this.props.match.params.id,
      event: null,
      eventChanges: null,
      eventChanged: false,
      editStep: null,
      error: null,
    };
  }

  editStepMap = {
    name: 1,
    description: 2,
    date: 3,
    ticketTiers: 4,
    location: 5,
  };

  eventPath = this.props.location.pathname.split('/').slice(0, -1).join('/');

  handleEditStep = (section) => {
    if (section === 'photo')
      this.props.history.push(`${this.eventPath}/upload-photo`);
    this.setState({ editStep: section });
  };

  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({
      eventChanges: {
        ...this.state.eventChanges,
        [name]: value,
      },
    });
  };

  handleEditCancel = () => {
    this.setState({ eventChanges: { ...this.state.event }, editStep: null });
  };

  handleEditSubmit = () => {
    this.setState(
      {
        event: { ...combineDateTime(this.state.eventChanges) },
        eventChanged: true,
        editStep: null,
      },
      () => console.log(this.state.event)
    );
  };

  handleDiscard = () => {
    const { location, history } = this.props;

    if (!location.state) {
      return history.push(this.eventPath);
    }

    history.push(location.state.from || this.eventPath);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { event, eventId } = this.state;
    console.log(event);
    fetch(`http://localhost:3000/api/events/${eventId}`, {
      method: 'PATCH',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...event,
      }),
    })
      .then((response) => response.json())
      .then((response) => handleHTTPError(response))
      .then((data) => {
        console.log(data);
      })
      .then(() => {
        this.props.history.push(this.eventPath);
      })
      .catch((err) => this.setState({ error: err }));
  };

  componentDidMount() {
    console.log(this.props.location, this.props.history, this.props.match);
    fetch(`http://localhost:3000/api/events/${this.state.eventId}`)
      .then((response) => response.json())
      .then((response) => handleHTTPError(response))
      .then((data) => {
        return splitDateTime(data.data.data);
      })
      .then((eventData) => {
        console.log(eventData);
        this.setState({
          event: {
            ...eventData,
          },
          eventChanges: {
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
    const { error, event, eventChanges, eventChanged, editStep } = this.state;

    if (error) return <ErrorPage {...error} />;
    if (!event) return <LoadingResource resource="event" />;

    return (
      <Container as="main" className="edit-event-page" fluid>
        <EditEventControl
          editStep={editStep}
          eventChanged={eventChanged}
          handleSubmit={this.handleSubmit}
          handleDiscard={this.handleDiscard}
        />
        {editStep ? (
          <form>
            <EventForm
              event={eventChanges}
              step={this.editStepMap[editStep]}
              handleChange={this.handleChange}
            />
            <Row>
              <Col xs={6}>
                <CustomButton type="button" onClick={this.handleEditCancel}>
                  Cancel
                </CustomButton>
              </Col>
              <Col xs={6}>
                <CustomButton type="button" onClick={this.handleEditSubmit}>
                  Submit
                </CustomButton>
              </Col>
            </Row>
          </form>
        ) : (
          <EventDetails
            editMode={true}
            handleEditStep={this.handleEditStep}
            {...event}
          />
        )}
      </Container>
    );
  }
}

export default EditEventPage;
