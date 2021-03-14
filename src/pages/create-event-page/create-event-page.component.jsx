import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import { isOnlineOnly } from '../../libs/isOnlineOnly';

import { DateTimeForm } from './components/DateTimeForm/DateTimeForm.component';
import TicketTiersForm from './components/TicketTiersForm/TicketTiersForm.component';
import { NameTypeCategoryForm } from './components/NameTypeCategoryForm/NameTypeCategoryForm.component';
import { DescriptionForm } from './components/DescriptionForm/DescriptionForm.component';
import { LocationForm } from './components/LocationForm/LocationForm.component';

import './create-event-page.styles.scss';

class CreateEventPage extends React.Component {
  constructor() {
    super();
    this.state = {
      currentEvent: {
        name: '',
        description: '',
        tierList: [],
        address: '',
        coordinates: [],
        dateStart: '',
        timeStart: '',
        dateEnd: '',
        timeEnd: '',
        type: '',
        category: '',
      },
    };
  }

  handleChange = (e) => {
    console.log(e);
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

  handleSubmit = () => {
    //insert gangsta shit
  };

  __prev = () => {
    //previous page
  };

  __next = () => {
    //next page
  };

  render() {
    const {
      name,
      type,
      dateStart,
      dateEnd,
      timeStart,
      timeEnd,
      description,
      tierList,
      address,
      coordinates,
    } = this.state.currentEvent;
    return (
      <Container as="main" className="create-event-page" fluid>
        <Row>
          <Col xs={12}>
            <h1 className="create-event-title">Create an event</h1>
          </Col>
        </Row>
        <form id="create-event-form" onSubmit={this.handleSubmit}>
          {/* <DateTime
            handleChange={this.handleChange}
            dateStart={dateStart}
            dateEnd={dateEnd}
            timeStart={timeStart}
            timeEnd={timeEnd}
          /> */}
          {/* <NameTypeCategory
            handleChange={this.handleChange}
            name={name}
            type={type}
          /> */}
          {/* <DescriptionEditor
            description={description}
            handleChange={this.handleChange}
          /> */}
          {/* <TicketTiersForm tierList={tierList} /> */}
          <LocationForm
            onlineOnly={isOnlineOnly(tierList)}
            address={address}
            handleChange={this.handleChange}
            coordinates={coordinates}
          />
        </form>
      </Container>
    );
  }
}

export default CreateEventPage;
