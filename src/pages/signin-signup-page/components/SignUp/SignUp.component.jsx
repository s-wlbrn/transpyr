import React from 'react';

import Col from 'react-bootstrap/Col';

import { CustomButton } from '../../../../components/CustomButton/CustomButton.component';
import { FormInput } from '../../../../components/FormInput/FormInput.component';

import './SignUp.styles.scss';

export const SignUp = ({
  handleSubmit,
  handleChange,
  name,
  email,
  password,
  passwordConfirm,
}) => (
  <Col as="section" className="signin-signup" xs={12}>
    <h2 className="signin-signup-title">Create an account</h2>
    <form onSubmit={handleSubmit}>
      <FormInput
        name="name"
        type="text"
        id="name"
        value={name}
        handleChange={handleChange}
        label="Name or Organization Name"
        required
      />
      <FormInput
        name="email"
        type="email"
        id="signupEmail"
        value={email}
        handleChange={handleChange}
        label="Email"
        required
      />
      <FormInput
        name="password"
        type="password"
        id="signupPassword"
        value={password}
        handleChange={handleChange}
        label="Password"
        required
      />
      <FormInput
        name="passwordConfirm"
        type="password"
        id="passwordConfirm"
        value={passwordConfirm}
        handleChange={handleChange}
        label="Confirm password"
        required
      />
      <CustomButton type="submit">Submit</CustomButton>
    </form>
  </Col>
);
