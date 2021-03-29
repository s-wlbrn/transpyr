import React from 'react';
import { withRouter } from 'react-router-dom';

import { Container, Row } from 'react-bootstrap';

import authContext from '../../auth/use-auth';

import { SignIn } from './components/SignIn/SignIn.component';
import { SignUp } from './components/SignUp/SignUp.component';

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
        let { from } = this.props.location.state || {
          from: { pathname: '/events' },
        };
        this.props.history.push(from);
      } catch (err) {
        console.log(err);
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
        <Row className="signin-signout">
          <SignIn
            handleSubmit={this.handleSubmit('signin')}
            handleChange={this.handleChange('signin')}
            email={this.state.signin.email}
            password={this.state.signin.password}
          />
          <SignUp
            handleSubmit={this.handleSubmit('signup')}
            handleChange={this.handleChange('signup')}
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
export default withRouter(SignInSignUpPage);
