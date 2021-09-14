import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { Col, Container, Row } from 'react-bootstrap';

import { useAuth } from '../../auth/use-auth';

import { SignIn } from '../../components/SignIn/SignIn.component';
import { SignUp } from '../../components/SignUp/SignUp.component';

import './signin-signup-page.styles.scss';

const SignInSignUpPage = () => {
  const { user } = useAuth();
  const location = useLocation();
  const history = useHistory();

  if (user) {
    let { from } = location.state || {
      from: { pathname: '/events' },
    };
    history.push(from);
  }

  return (
    <Container fluid as="main" className="signin-signup-page">
      <Row className="signin-signup">
        <Col as="section" xs={12} md={6}>
          <SignIn />
        </Col>
        <Col as="section" xs={12} md={6}>
          <SignUp />
        </Col>
      </Row>
    </Container>
  );
};

export default SignInSignUpPage;
