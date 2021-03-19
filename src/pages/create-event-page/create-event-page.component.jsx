import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import { isOnlineOnly } from '../../libs/isOnlineOnly';
import { handleHTTPError } from '../../libs/handleHTTPError';
import { combineDateTime } from '../../libs/combineDateTime';

import { DateTimeForm } from './components/DateTimeForm/DateTimeForm.component';
import TicketTiersForm from './components/TicketTiersForm/TicketTiersForm.component';
import { NameTypeCategoryForm } from './components/NameTypeCategoryForm/NameTypeCategoryForm.component';
import { DescriptionForm } from './components/DescriptionForm/DescriptionForm.component';
import { LocationForm } from './components/LocationForm/LocationForm.component';

import { CustomButton } from '../../components/CustomButton/CustomButton.component';

import './create-event-page.styles.scss';

class CreateEventPage extends React.Component {
  constructor() {
    super();
    this.state = {
      currentEvent: {
        name: '',
        description: '',
        ticketTiers: [],
        address: '',
        location: [],
        dateStart: '',
        dateEnd: '',
        timeStart: '',
        timeEnd: '',
        type: '',
        category: '',
      },
      currentStep: 1,
    };
  }

  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState(
      {
        currentEvent: {
          ...this.state.currentEvent,
          [name]: value,
        },
      },
      () => {
        console.log(this.state.currentEvent);
      }
    );
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const formattedEvent = combineDateTime(this.state.currentEvent);
    formattedEvent.location = {
      type: 'Point',
      coordinates: formattedEvent.location,
    };
    console.log(formattedEvent);
    fetch(`http://localhost:3000/api/events`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formattedEvent,
      }),
    })
      .then((response) => response.json())
      .then((response) => handleHTTPError(response))
      .then((data) => {
        console.log(data);
      })
      // .then(() => {
      //   this.setState(initialState);
      //   this.props.history.push(REDIRECT TO PHOTO UPLOAD);
      // })
      .catch((err) => console.log(err));
  };

  _prev = () => {
    let { currentStep } = this.state;
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    this.setState({
      currentStep: currentStep,
    });
  };

  _next = () => {
    //next should also trigger validation
    let { currentStep } = this.state;
    currentStep = currentStep >= 4 ? 5 : currentStep + 1;
    this.setState({
      currentStep,
    });
  };

  renderSwitch(step) {
    const {
      name,
      type,
      category,
      dateStart,
      dateEnd,
      timeStart,
      timeEnd,
      description,
      ticketTiers,
      address,
      location,
    } = this.state.currentEvent;
    switch (step) {
      case 1:
        return (
          <NameTypeCategoryForm
            handleChange={this.handleChange}
            name={name}
            type={type}
            category={category}
          />
        );
      case 2:
        return (
          <DescriptionForm
            description={description}
            handleChange={this.handleChange}
          />
        );
      case 3:
        return (
          <DateTimeForm
            handleChange={this.handleChange}
            dateStart={dateStart}
            dateEnd={dateEnd}
            timeStart={timeStart}
            timeEnd={timeEnd}
          />
        );
      case 4:
        return (
          <TicketTiersForm
            ticketTiers={ticketTiers}
            handleChange={this.handleChange}
          />
        );
      case 5:
        return (
          <LocationForm
            onlineOnly={isOnlineOnly(ticketTiers)}
            address={address}
            handleChange={this.handleChange}
            location={location}
          />
        );

      default:
        return null;
    }
  }

  render() {
    const { currentStep } = this.state;
    return (
      <Container as="main" className="create-event-page" fluid>
        <Row>
          <Col xs={12}>
            <h1 className="create-event-title">Create an event</h1>
          </Col>
        </Row>
        <form id="create-event-form" onSubmit={this.handleSubmit}>
          {this.renderSwitch(currentStep)}
          <Row>
            <Col xs={6}>
              {currentStep > 1 ? (
                <CustomButton type="button" onClick={this._prev}>
                  Previous
                </CustomButton>
              ) : null}
            </Col>
            <Col xs={6}>
              {currentStep < 5 ? (
                <CustomButton type="button" onClick={this._next}>
                  Next
                </CustomButton>
              ) : (
                <CustomButton type="button" onClick={this.handleSubmit}>
                  Submit
                </CustomButton>
              )}
            </Col>
          </Row>
        </form>
      </Container>
    );
  }
}

export default CreateEventPage;
