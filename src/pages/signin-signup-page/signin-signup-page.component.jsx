import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import { Container, Row } from 'react-bootstrap';

import authContext from '../../auth/use-auth';

import { SignIn } from './components/SignIn/SignIn.component';
import { SignUp } from './components/SignUp/SignUp.component';
import { ResponseMessage } from '../../components/ResponseMessage/ResponseMessage.component';

import './signin-signup-page.styles.scss';

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
  response: {
    signin: '',
    signup: '',
  },
};

class SignInSignUpPage extends React.Component {
  static contextType = authContext;
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  handleChange = (endpoint) => (e) => {
    const { value, name } = e.target;

    this.setState({
      [endpoint]: {
        ...this.state[endpoint],
        [name]: value,
      },
    });
  };

  handleSubmit = (endpoint) => {
    const auth = this.context;
    const submitFunction = endpoint === 'signin' ? auth.signIn : auth.signUp;
    const submitArguments = Object.values(this.state[endpoint]);

    return async (e) => {
      try {
        e.preventDefault();
        await submitFunction(...submitArguments);
        // Redirect to 'from' route or default to home
        let { from } = this.props.location.state || {
          from: { pathname: '/events' },
        };
        this.props.history.push(from);
      } catch (err) {
        this.setState({ response: { [endpoint]: err.message } });
      }
    };
  };

  componentDidUpdate() {
    if (this.context.user) {
      let { from } = this.props.location.state || {
        from: { pathname: '/events' },
      };
      this.props.history.push(from);
    }
  }

  render() {
    return (
      <Container as="main" fluid>
        <Row className="signin-signup">
          <SignIn
            handleSubmit={this.handleSubmit('signin')}
            handleChange={this.handleChange('signin')}
            email={this.state.signin.email}
            password={this.state.signin.password}
            response={this.state.response.signin}
          />
          <SignUp
            handleSubmit={this.handleSubmit('signup')}
            handleChange={this.handleChange('signup')}
            name={this.state.signup.name}
            email={this.state.signup.email}
            password={this.state.signup.password}
            passwordConfirm={this.state.signup.passwordConfirm}
            response={this.state.response.signup}
          />
        </Row>
      </Container>
    );
  }
}
export default withRouter(SignInSignUpPage);
