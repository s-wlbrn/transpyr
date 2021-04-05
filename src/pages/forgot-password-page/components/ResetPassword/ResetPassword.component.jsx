import React, { useState } from 'react';

import { Col, Row } from 'react-bootstrap';

import myAxios from '../../../../auth/axios.config';

import { FormInput } from '../../../../components/FormInput/FormInput.component';
import { CustomButton } from '../../../../components/CustomButton/CustomButton.component';
import { ResponseMessage } from '../../../../components/ResponseMessage/ResponseMessage.component';

//import './ForgotPassword.styles.scss';

export const ResetPassword = ({ history, match }) => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [response, setResponse] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await myAxios().patch(
        `http://localhost:3000/api/users/reset-password/${match.params.token}`,
        {
          password,
          passwordConfirm,
        }
      );
      setSuccess(true);
    } catch (err) {
      setResponse(err.response.data.message);
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
          {response && <ResponseMessage error>{response}</ResponseMessage>}
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
