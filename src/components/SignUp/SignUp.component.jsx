import React, { useState } from 'react';

import { useAuth } from '../../auth/use-auth';

import { CustomButton } from '../CustomButton/CustomButton.component';
import { FormInput } from '../FormInput/FormInput.component';
import { ResponseMessage } from '../ResponseMessage/ResponseMessage.component';

export const SignUp = ({ location }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [response, setResponse] = useState('');

  const { signUp } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(name, email, password, passwordConfirm);
      // Redirect to 'from' route or default to home
      // let { from } = this.props.location.state || {
      //   from: { pathname: '/events' },
      // };
      // this.props.history.push(from);
    } catch (err) {
      setResponse(err.message);
    }
  };

  return (
    <div className="signup">
      <h2 className="signin-signup-title">Create an account</h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          name="name"
          type="text"
          id="name"
          value={name}
          handleChange={(e) => setName(e.target.value)}
          label="Name or Organization Name"
          required
        />
        <FormInput
          name="email"
          type="email"
          id="signupEmail"
          value={email}
          handleChange={(e) => setEmail(e.target.value)}
          label="Email"
          required
        />
        <FormInput
          name="password"
          type="password"
          id="signupPassword"
          value={password}
          handleChange={(e) => setPassword(e.target.value)}
          label="Password"
          required
        />
        <FormInput
          name="passwordConfirm"
          type="password"
          id="passwordConfirm"
          value={passwordConfirm}
          handleChange={(e) => setPasswordConfirm(e.target.value)}
          label="Confirm password"
          required
        />
        <CustomButton type="submit">Submit</CustomButton>
      </form>
      <ResponseMessage error>{response}</ResponseMessage>
    </div>
  );
};
