import React, { useState } from 'react';

import { Col, Row } from 'react-bootstrap';

import API from '../../../../api';
import { useResponse } from '../../../../libs/useResponse';

import { FormInput } from '../../../../components/FormInput/FormInput.component';
import { CustomButton } from '../../../../components/CustomButton/CustomButton.component';
import { ResponseMessage } from '../../../../components/ResponseMessage/ResponseMessage.component';

import './ForgotPassword.styles.scss';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const { response, createResponse } = useResponse();
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await new API().forgotPassword(email);
      setEmail('');
      setSuccess(true);
    } catch (err) {
      createResponse(err);
    }
  };

  return !success ? (
    <Row className="forgot-password">
      <Col xs={12}>
        <p className="forgot-password-text">
          Enter your email adress below. If there is an account associated with
          it, a link to reset the password will be sent to that email address.
        </p>
      </Col>
      <Col xs={12}>
        <form onSubmit={handleSubmit}>
          <FormInput
            name="email"
            type="email"
            id="email"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
            label="Email"
            required
          />
          <CustomButton type="submit">Submit</CustomButton>
        </form>
        <ResponseMessage response={response} />
      </Col>
    </Row>
  ) : (
    <Col xs={12}>
      <p>
        A password reset email has been sent to the specified address. Follow
        the link in the email to reset your password.
      </p>
    </Col>
  );
};
