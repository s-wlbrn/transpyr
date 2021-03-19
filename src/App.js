import React from 'react';
import { Switch, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

import Splashpage from './pages/splash/splash.component';
import Homepage from './pages/homepage/homepage.component';
import EventDetailsPage from './pages/event-details-page/event-details-page.component';
import ErrorPage from './pages/error-page/error-page.component';
import SignInSignUpPage from './pages/signin-signup-page/signin-signup-page.component';
import CreateEventPage from './pages/create-event-page/create-event-page.component';
import EditEventPage from './pages/edit-event-page/edit-event-page.component';
import UploadEventPhotoPage from './pages/upload-event-photo/upload-event-photo-page.component';

import { TopNav } from './components/TopNav/TopNav.component';
import { Footer } from './components/Footer/Footer.component';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
      userSignedOut: false,
    };
  }

  signinUser = (user) => {
    console.log(user);
    this.setState(
      {
        currentUser: {
          ...user,
        },
      },
      () => {
        console.log(this.state.currentUser);
      }
    );
  };

  signoutUser = () => {
    this.setState({
      currentUser: null,
    });
  };

  render() {
    return (
      <div className="app">
        <TopNav user={this.state.currentUser} signoutUser={this.signoutUser} />
        <Switch>
          <Route exact path="/" component={Splashpage} />
          <Route exact path="/events" component={Homepage} />
          <Route
            exact
            path="/events/create-event"
            component={CreateEventPage}
          />
          <Route exact path="/events/id/:id" component={EventDetailsPage} />
          <Route exact path="/events/id/:id/edit" component={EditEventPage} />
          <Route
            exact
            path="/events/id/:id/upload-photo"
            component={UploadEventPhotoPage}
          />
          <Route exact path="/users/signin">
            <SignInSignUpPage signinUser={this.signinUser} />
          </Route>
          <Route path="*">
            <ErrorPage code="404" message="Page not found." />
          </Route>
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
