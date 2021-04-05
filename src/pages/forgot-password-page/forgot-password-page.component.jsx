import React from 'react';

import { Switch, Route } from 'react-router';
import { Col, Row, Container } from 'react-bootstrap';

import { ForgotPassword } from './components/ForgotPassword/ForgotPassword.component';
import { ResetPassword } from './components/ResetPassword/ResetPassword.component';

import './forgot-password-page.styles.scss';

const ForgotPasswordPage = ({ match }) => {
  return (
    <Container fluid as="main" className="forgot-password-page">
      <Row>
        <Col xs={12}>
          <h1>Forgot password</h1>
        </Col>
      </Row>
      <Switch>
        <Route exact path="/users/forgot-password" component={ForgotPassword} />
        <Route
          exact
          path="/users/forgot-password/:token"
          component={ResetPassword}
        />
      </Switch>
    </Container>
  );
};

export default ForgotPasswordPage;
