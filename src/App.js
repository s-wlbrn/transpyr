import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

import { useAuth } from './auth/use-auth';
import { PrivateRoute } from './auth/PrivateRoute';

import Splashpage from './pages/splash/splash.component';
import Homepage from './pages/homepage/homepage.component';
import EventDetailsPage from './pages/event-details-page/event-details-page.component';
import ErrorPage from './pages/error-page/error-page.component';
import SignInSignUpPage from './pages/signin-signup-page/signin-signup-page.component';
import CreateEventPage from './pages/create-event-page/create-event-page.component';
import EditEventPage from './pages/edit-event-page/edit-event-page.component';
import UploadEventPhotoPage from './pages/upload-event-photo/upload-event-photo-page.component';
import ForgotPasswordPage from './pages/forgot-password-page/forgot-password-page.component';

import { TopNav } from './components/TopNav/TopNav.component';
import { Footer } from './components/Footer/Footer.component';

const App = () => {
  const auth = useAuth();

  //Silent token refresh
  useEffect(() => {
    const silentRefresh = async () => {
      if (!auth.user) {
        await auth.refreshToken();
      } else if (auth.expiresIn) {
        setTimeout(async () => {
          await auth.refreshToken();
        }, auth.expiresIn);
      }
    };

    silentRefresh();
  });

  return (
    <div className="app">
      <TopNav />
      <Switch>
        <Route exact path="/" component={Splashpage} />
        <Route exact path="/events" component={Homepage} />
        <PrivateRoute exact path="/events/create-event">
          <CreateEventPage />
        </PrivateRoute>
        <Route exact path="/events/id/:id" component={EventDetailsPage} />
        <PrivateRoute exact path="/events/id/:id/edit">
          <EditEventPage />
        </PrivateRoute>
        <Route
          exact
          path="/events/id/:id/upload-photo"
          component={UploadEventPhotoPage}
        />
        <Route exact path="/users/signin">
          <SignInSignUpPage />
        </Route>
        <Route path="/users/forgot-password" component={ForgotPasswordPage} />
        {/* <Route>
          exact
          patch="/users/reset-password/:token"
          component={ResetPasswordPage}
        </Route> */}
        <Route path="*">
          <ErrorPage statusCode="404" message="Page not found." />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
