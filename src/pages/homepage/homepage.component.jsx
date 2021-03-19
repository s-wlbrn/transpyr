import React from 'react';

import { LocationButton } from './components/LocationButton/LocationButton.component';
import { FilterMenu } from './components/FilterMenu/FilterMenu.component';
import { EventList } from './components/EventList/EventList.component';
import { LoadingResource } from '../../components/LoadingResource/LoadingResource.component';

import { calculateEventInfo } from '../../libs/calculateEventInfo';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './homepage.styles.scss';

class Homepage extends React.Component {
  constructor(props) {
    super();
    this.state = {
      events: [],
    };
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/events?sort=dateTimeStart')
      .then((response) => response.json())
      .then((data) => {
        return data.data.data.map((el) => calculateEventInfo(el));
      })
      .then((events) => {
        console.log(events);
        this.setState({ events });
      });
  }

  render() {
    const { events } = this.state;
    return (
      <Container as="main" fluid className="homepage">
        <Row>
          <Col>
            <p>Popular events...</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <LocationButton name="Online" />
          </Col>
          <Col>
            <LocationButton name="Near you" />
          </Col>
        </Row>
        <Row>
          <Col>
            <FilterMenu />
          </Col>
        </Row>
        <Row>
          <Col>
            {events.length ? (
              <EventList events={events} />
            ) : (
              <LoadingResource resource="events" />
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Homepage;
