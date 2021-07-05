import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useResponse } from '../../libs/useResponse';
import { CustomButton } from '../CustomButton/CustomButton.component';
import { FormInput } from '../FormInput/FormInput.component';
import { validationSchema } from './GuestForm.schema';

import { SignIn } from '../SignIn/SignIn.component';
import { SignUp } from '../SignUp/SignUp.component';

import './SigninOrGuestForm.styles.scss';
import { ResponseMessage } from '../ResponseMessage/ResponseMessage.component';

export const SigninOrGuestForm = ({ setGuest }) => {
  const [signupForm, setSignupForm] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const { response, createResponse } = useResponse();

  const handleSubmitGuest = async (e) => {
    try {
      e.preventDefault();
      await validationSchema.validate({ name, email });

      setGuest({
        name,
        email,
      });
    } catch (err) {
      createResponse(err);
    }
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
          <ResponseMessage response={response} />
        </form>
      </Col>
    </Row>
  );
};
