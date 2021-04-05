import React from 'react';

import Col from 'react-bootstrap/Col';
import { useHistory } from 'react-router';
import { CustomButton } from '../../../../components/CustomButton/CustomButton.component';
import { FormInput } from '../../../../components/FormInput/FormInput.component';
import { ResponseMessage } from '../../../../components/ResponseMessage/ResponseMessage.component';

export const SignIn = ({
  handleSubmit,
  handleChange,
  email,
  password,
  response,
}) => {
  const history = useHistory();
  return (
    <Col as="section" className="signin" xs={12}>
      <h2 className="signin-signup-title">
        Sign in with your email and password
      </h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="email"
          id="email"
          value={email}
          handleChange={handleChange}
          label="Email"
          required
        />
        <FormInput
          name="password"
          type="password"
          id="password"
          value={password}
          handleChange={handleChange}
          label="Password"
          required
        />
        <div className="signin-button-group">
          <CustomButton type="submit">Submit</CustomButton>
          <CustomButton
            type="button"
            onClick={() => history.push('/users/forgot-password')}
          >
            Forgot password?
          </CustomButton>
        </div>
      </form>
      <ResponseMessage error>{response}</ResponseMessage>
    </Col>
  );
};
