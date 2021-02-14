import React from 'react';

import './error-page.styles.scss';

const ErrorPage = ({ code, message }) => (
  <div className="error">
    <h1>{code}</h1>
    <h2>Oops! There was an error:</h2>
    <p className="error-message">{message}</p>
  </div>
);

export default ErrorPage;
