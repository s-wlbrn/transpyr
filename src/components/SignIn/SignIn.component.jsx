import React, { useState } from 'react';
import { useHistory } from 'react-router';

import { useAuth } from '../../auth/use-auth';
import { validationSchema } from './SignIn.schema';
import { useResponse } from '../../libs/useResponse';

import { CustomButton } from '../CustomButton/CustomButton.component';
import { FormInput } from '../FormInput/FormInput.component';
import { ResponseMessage } from '../ResponseMessage/ResponseMessage.component';

import './SignIn.styles.scss';
import { useLocation } from 'react-router-dom';

export const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { response, createResponse } = useResponse();
  const { signIn } = useAuth();
  const location = useLocation();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(
        { email, password },
        { abortEarly: false }
      );
      await signIn(email, password);
      // Redirect to 'from' route or default to home
      let { from } = location.state || {
        from: { pathname: '/events' },
      };
      history.push(from.pathname);
    } catch (err) {
      createResponse(err);
    }
  };

  return (
    <div className="signin">
      <h2 className="signin-signup-title">
        Sign in with your email and password
      </h2>
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
        <FormInput
          name="password"
          type="password"
          id="password"
          value={password}
          handleChange={(e) => setPassword(e.target.value)}
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
      <ResponseMessage response={response} />
    </div>
  );
};
