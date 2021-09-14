import React, { useState } from 'react';

import { Col, Row } from 'react-bootstrap';

import { FormInput } from '../../../../components/FormInput/FormInput.component';
import { CustomButton } from '../../../../components/CustomButton/CustomButton.component';
import { ResponseMessage } from '../../../../components/ResponseMessage/ResponseMessage.component';
import API from '../../../../api';
import { useResponse } from '../../../../libs/useResponse';

import './ResetPassword.styles.scss';
import { validationSchema } from './ResetPassword.schema';

export const ResetPassword = ({ history, match }) => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const { response, createResponse } = useResponse();
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(
        { password, passwordConfirm },
        { abortEarly: false }
      );
      await new API().resetPassword(
        match.params.token,
        password,
        passwordConfirm
      );
      setSuccess(true);
    } catch (err) {
      createResponse(err);
    }
  };

  return (
    <Row className="reset-password">
      {!success ? (
        <Col xs={12}>
          <p>Enter your password and confirmation below.</p>
          <form onSubmit={handleSubmit}>
            <FormInput
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              required
            />
            <FormInput
              type="password"
              id="passwordConfirm"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              label="Confirm Password"
              required
            />
            <CustomButton type="submit">Submit</CustomButton>
          </form>
          <ResponseMessage response={response} />
        </Col>
      ) : (
        <Col xs={12}>
          <p>
            Success! Your password has been changed. Please sign in with your
            new password.
          </p>
          <CustomButton
            type="button"
            onClick={() => history.push('/users/signin')}
          >
            Sign in
          </CustomButton>
        </Col>
      )}
    </Row>
  );
};
