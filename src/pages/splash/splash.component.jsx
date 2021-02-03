import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './splash.styles.scss';

export const Splashpage = (props) => (
  <Container fluid>
    <Row>
      <Col>
        <section className="hero">
          <h1>
            Transpyr is a platform for organizing and booking events around the
            world.
          </h1>
          <p>- Browse events -</p>
        </section>
      </Col>
    </Row>
  </Container>
);
