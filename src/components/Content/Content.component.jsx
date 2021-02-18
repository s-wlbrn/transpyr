import React from 'react';

import Container from 'react-bootstrap/Container';

import './Content.styles.scss';

export const Content = (props) => (
  <Container as="main" className="content" fluid>
    {props.children}
  </Container>
);
