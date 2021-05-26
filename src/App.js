import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

import { useAuth } from './auth/use-auth';
import { PrivateRoute } from './auth/PrivateRoute';

import Homepage from './pages/homepage/homepage.component';
import EventDetailsPage from './pages/event-details-page/event-details-page.component';
import ErrorPage from './pages/error-page/error-page.component';
import SignInSignUpPage from './pages/signin-signup-page/signin-signup-page.component';
import CreateEventPage from './pages/create-event-page/create-event-page.component';
import EditEventPage from './pages/edit-event-page/edit-event-page.component';
import UploadEventPhotoPage from './pages/upload-event-photo/upload-event-photo-page.component';
import ForgotPasswordPage from './pages/forgot-password-page/forgot-password-page.component';
import { BookEventPage } from './pages/book-event-page/book-event.component';
import BookingPaymentSuccessPage from './pages/booking-payment-success-page/booking-payment-success-page.component';
import { PublishEventPage } from './pages/publish-event-page/publish-event-page.component';
import EditProfilePage from './pages/edit-profile-page/edit-profile-page.component';
import EditSettingsPage from './pages/edit-settings-page/edit-settings-page.component';
import UserProfilePage from './pages/user-profile-page/user-profile-page.component';

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
  }, [auth]);

  return (
    <div className="app">
      <TopNav />
      <Switch>
        <PrivateRoute exact path="/events/id/:id/publish-event">
          <PublishEventPage />
        </PrivateRoute>
        <PrivateRoute exact path="/events/id/:id/edit">
          <EditEventPage />
        </PrivateRoute>
        <Route
          exact
          path="/events/id/:id/upload-photo"
          component={UploadEventPhotoPage}
        />
        <Route
          exact
          path="/events/id/:id/book-event"
          component={BookEventPage}
        />
        <Route path="/events/id/:id" component={EventDetailsPage} />
        <PrivateRoute exact path="/events/create-event">
          <CreateEventPage />
        </PrivateRoute>
        <Route exact path="/events" component={Homepage} />

        <PrivateRoute exact path="/users/edit-profile">
          <EditProfilePage />
        </PrivateRoute>
        <PrivateRoute exact path="/users/settings">
          <EditSettingsPage />
        </PrivateRoute>
        <Route exact path="/users/signin" component={SignInSignUpPage} />
        <Route path="/users/forgot-password" component={ForgotPasswordPage} />
        <Route path="/users/id/:id" component={UserProfilePage} />
        {/* <Route>
          exact
          patch="/users/reset-password/:token"
          component={ResetPasswordPage}
        </Route> */}

        <Route path="/bookings/create" component={BookingPaymentSuccessPage} />

        <Route exact path="/">
          <Redirect to="/events" />
        </Route>

        <Route path="*">
          <ErrorPage statusCode="404" message="Page not found." />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
