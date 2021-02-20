import React from 'react';

import Col from 'react-bootstrap/Col';
import { CustomButton } from '../../../../components/CustomButton/CustomButton.component';
import { FormInput } from '../../../../components/FormInput/FormInput.component';

import './SignIn.styles.scss';

export const SignIn = ({ handleSubmit, handleChange, email, password }) => (
  <Col as="section" className="signin-signup" xs={12}>
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
        <CustomButton type="button">Forgot password?</CustomButton>
      </div>
    </form>
  </Col>
);
