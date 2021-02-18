import React from 'react';

import Container from 'react-bootstrap/Container';

import './error-page.styles.scss';

const ErrorPage = ({ code, message }) => (
  <Container as="main" className="error-page" fluid>
    <div className="error">
      <h1>{code}</h1>
      <h2>Oops! There was an error:</h2>
      <p className="error-message">{message}</p>
    </div>
  </Container>
);

export default ErrorPage;
