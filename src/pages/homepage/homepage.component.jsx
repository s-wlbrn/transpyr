import React from 'react';

import { LocationButton } from './components/LocationButton/LocationButton.component';
import { FilterMenu } from './components/FilterMenu/FilterMenu.component';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './homepage.styles.scss';

class Homepage extends React.Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    return (
      <Container>
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
      </Container>
    );
  }
}

export default Homepage;
