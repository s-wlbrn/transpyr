import React from 'react';
import { splitDateTime, combineDateTime } from '../../libs/formatDateTime';
import { withRouter } from 'react-router-dom';

import myAxios from '../../auth/axios.config';
import authContext from '../../auth/use-auth';

import { Col, Container, Row } from 'react-bootstrap';
import ErrorPage from '../error-page/error-page.component';
import { EventDetails } from '../../components/EventDetails/EventDetails.component';
import { EventForm } from '../../components/EventForm/EventForm.component';
import { EditEventControl } from './components/EditEventControl/EditEventControl.component';
import { LoadingResource } from '../../components/LoadingResource/LoadingResource.component';
import { CustomButton } from '../../components/CustomButton/CustomButton.component';

import './edit-event-page.styles.scss';

class EditEventPage extends React.Component {
  static contextType = authContext;
  constructor(props) {
    super(props);
    this.state = {
      eventId: props.match.params.id,
      event: null,
      eventChanges: null,
      eventChanged: false,
      editStep: null,
      error: null,
    };

    this.eventPath = props.location.pathname.split('/').slice(0, -1).join('/');
  }

  editStepMap = {
    name: 1,
    description: 2,
    date: 3,
    ticketTiers: 4,
    location: 5,
  };

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

  handleSubmit = async (e) => {
    e.preventDefault();
    const { event, eventId } = this.state;
    const { token } = this.context;

    try {
      await myAxios(token).put(
        `http://localhost:3000/api/events/${eventId}`,
        event
      );
      this.props.history.push(this.eventPath);
    } catch (err) {
      this.setState({ error: { ...err.response.data } });
    }
  };

  fetchEvent = async () => {
    const { user } = this.context;
    const response = await myAxios().get(
      `http://localhost:3000/api/events/${this.state.eventId}`
    );

    //handle unauthorized
    if (user._id !== response.data.data.organizer) {
      return Promise.reject({
        response: {
          data: {
            statusCode: 403,
            message: 'You are not the organizer of this event.',
          },
        },
      });
    }
    console.log(response);
    return response.data.data;
  };

  async componentDidMount() {
    try {
      const eventData = await this.fetchEvent();
      const formattedData = splitDateTime(eventData);
      this.setState({
        event: {
          ...formattedData,
        },
        eventChanges: {
          ...formattedData,
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
    const { error, event, eventChanges, eventChanged, editStep } = this.state;

    if (error) return <ErrorPage {...error} />;
    if (!event) return <LoadingResource>Loading event...</LoadingResource>;

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

export default withRouter(EditEventPage);
