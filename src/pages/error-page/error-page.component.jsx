import React, { useEffect, useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { CustomButton } from '../../components/CustomButton/CustomButton.component';

import './error-page.styles.scss';

const ErrorPage = ({ error, resetErrorBoundary }) => {
  const history = useHistory();
  const [errorInfo, setErrorInfo] = useState({
    statusCode: null,
    message: null,
  });

  useEffect(() => {
    setErrorInfo({
      statusCode: error.statusCode || 500,
      message: error.message || 'Something went wrong.',
    });
    const unlisten = history.listen(() => {
      resetErrorBoundary();
    });

    return () => {
      unlisten();
    };
  }, [error.message, error.statusCode, resetErrorBoundary, history]);

  const goBack = () => {
    history.goBack();
    resetErrorBoundary();
  };
  const tryAgain = () => {
    resetErrorBoundary();
  };

  const { statusCode, message } = errorInfo;
  return (
    <Container as="main" className="error-page" fluid>
      <Row as="section" className="error">
        <Col xs={12} role="alert">
          <h1>{statusCode}</h1>
          <h2>Oops! There was an error:</h2>
          <p className="error-message">{message}</p>
        </Col>
      </Row>
      <Row className="error-controls">
        {history.length > 1 && (
          <CustomButton type="button" onClick={goBack}>
            Go back
          </CustomButton>
        )}

        <CustomButton type="button" onClick={tryAgain}>
          Try again
        </CustomButton>
      </Row>
    </Container>
  );
};

export default ErrorPage;
