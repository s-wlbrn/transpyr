import React, { useState } from 'react';

import { useHistory } from 'react-router';
import { useAuth } from '../../auth/use-auth';
import { CustomButton } from '../CustomButton/CustomButton.component';
import { FormInput } from '../FormInput/FormInput.component';
import { ResponseMessage } from '../ResponseMessage/ResponseMessage.component';

import './SignIn.styles.scss';

export const SignIn = ({ location }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState('');

  const { signIn } = useAuth();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      // Redirect to 'from' route or default to home
      let { from } = this.props.location.state || {
        from: { pathname: '/events' },
      };
      this.props.history.push(from);
    } catch (err) {
      setResponse(err.message);
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
      <ResponseMessage error>{response}</ResponseMessage>
    </div>
  );
};
