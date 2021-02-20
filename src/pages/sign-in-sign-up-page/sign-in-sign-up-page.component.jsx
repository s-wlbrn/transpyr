import React from 'react';

import { handleHTTPError } from '../../libs/handleHTTPError';

import { Container, Row } from 'react-bootstrap';

import { SignIn } from './components/SignIn/SignIn.component';
import { SignUp } from './components/SignUp/SignUp.component';

import './sign-in-sign-up-page.styles.scss';

const initialState = {
  signin: {
    email: '',
    password: '',
  },
  signup: {
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  },
};

class SignInSignUpPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  handleChangeSignin = (endpoint) => (e) => {
    const { value, name } = e.target;
    this.setState({
      [endpoint]: {
        ...this.state[endpoint],
        [name]: value,
      },
    });
  };

  handleSubmitSignin = (endpoint) => (e) => {
    e.preventDefault();
    console.log(this.state[endpoint]);
    fetch(`http://localhost:3000/api/users/${endpoint}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...this.state[endpoint],
      }),
    })
      .then((response) => response.json())
      .then((response) => handleHTTPError(response))
      .then((data) => {
        this.props.signinUser(data.data.user);
      })
      .then(() => {
        this.setState(initialState);
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <Container as="main" fluid>
        <Row className="signin-signout">
          <SignIn
            handleSubmit={this.handleSubmitSignin('signin')}
            handleChange={this.handleChangeSignin('signin')}
            email={this.state.signin.email}
            password={this.state.signin.password}
          />
          <SignUp
            handleSubmit={this.handleSubmitSignin('signup')}
            handleChange={this.handleChangeSignin('signup')}
            name={this.state.signup.name}
            email={this.state.signup.email}
            password={this.state.signup.password}
            passwordConfirm={this.state.signup.passwordConfirm}
          />
        </Row>
      </Container>
    );
  }
}
export default SignInSignUpPage;
