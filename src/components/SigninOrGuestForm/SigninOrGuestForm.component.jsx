import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useAuth } from '../../auth/use-auth';
import { CustomButton } from '../CustomButton/CustomButton.component';
import { FormInput } from '../FormInput/FormInput.component';

import { SignIn } from '../SignIn/SignIn.component';
import { SignUp } from '../SignUp/SignUp.component';

import './SigninOrGuestForm.styles.scss';

export const SigninOrGuestForm = ({ setGuest }) => {
  //const { signIn, signUp } = useAuth();
  const [signupForm, setSignupForm] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSubmitGuest = (e) => {
    e.preventDefault();
    //validation here
    setGuest({
      name,
      email,
    });
  };

  return (
    <Row className="signin-or-guest-form">
      <Col xs={12} md={6}>
        {signupForm ? <SignUp /> : <SignIn />}
        <div
          className="signin-signup-toggle"
          onClick={() => setSignupForm(!signupForm)}
        >
          {!signupForm
            ? 'Create an account'
            : 'Sign in with email and password'}
        </div>
      </Col>

      <Col xs={12} md={6} className="guest-form">
        <h2>...or checkout as a guest</h2>
        <form onSubmit={handleSubmitGuest}>
          <FormInput
            name="name"
            type="text"
            id="name"
            value={name}
            handleChange={(e) => setName(e.target.value)}
            label="Name"
            required
          />
          <FormInput
            name="email"
            type="email"
            id="guestEmail"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
            label="Email"
            required
          />
          <CustomButton type="submit">Submit</CustomButton>
        </form>
      </Col>
    </Row>
  );
};
