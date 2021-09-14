import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { useAuth } from '../../auth/use-auth';
import { useResponse } from '../../libs/useResponse';

import { CustomButton } from '../CustomButton/CustomButton.component';
import { FormInput } from '../FormInput/FormInput.component';
import { ResponseMessage } from '../ResponseMessage/ResponseMessage.component';
import { validationSchema } from './SignUp.schema';

import './SignUp.styles.scss';

export const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const history = useHistory();
  const location = useLocation();
  const { response, createResponse } = useResponse();
  const { signUp } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(
        { name, email, password, passwordConfirm },
        { abortEarly: false }
      );
      await signUp(name, email, password, passwordConfirm);
      // Redirect to 'from' route or default to home
      let { from } = location.state || {
        from: { pathname: '/users/edit-profile' },
      };
      history.push(from.pathname);
    } catch (err) {
      createResponse(err);
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
      <ResponseMessage response={response} />
    </div>
  );
};
