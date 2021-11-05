import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

import { useAuth } from './auth/use-auth';
import { PrivateRoute } from './auth/PrivateRoute';
import AppError from './libs/AppError';
import API from './api';

import Homepage from './pages/homepage/homepage.component';
import EventDetailsPage from './pages/event-details-page/event-details-page.component';
import ErrorPage from './pages/error-page/error-page.component';
import SignInSignUpPage from './pages/signin-signup-page/signin-signup-page.component';
import CreateEventPage from './pages/create-event-page/create-event-page.component';
import EditEventPage from './pages/edit-event-page/edit-event-page.component';
import UploadEventPhotoPage from './pages/upload-event-photo/upload-event-photo-page.component';
import ForgotPasswordPage from './pages/forgot-password-page/forgot-password-page.component';
import BookEventPage from './pages/book-event-page/book-event-page.component';
import BookingPaymentSuccessPage from './pages/booking-payment-success-page/booking-payment-success-page.component';
import { PublishEventPage } from './pages/publish-event-page/publish-event-page.component';
import EditProfilePage from './pages/edit-profile-page/edit-profile-page.component';
import EditSettingsPage from './pages/edit-settings-page/edit-settings-page.component';
import UserProfilePage from './pages/user-profile-page/user-profile-page.component';
import MyEventsPage from './pages/my-events-page/my-events-page.component';
import ManageEventPage from './pages/manage-event-page/manage-event-page.component';
import MyBookingsPage from './pages/my-bookings-page/my-bookings-page.component';
import RefundRequestsPage from './pages/refund-requests-page/RefundRequestsPage.component';
import ManageBookingPage from './pages/manage-booking-page/manage-booking-page.component';
import { SearchPage } from './pages/search-page/search-page.component';

import { TopNav } from './components/TopNav/TopNav.component';
import { Footer } from './components/Footer/Footer.component';
import { SemiPrivateRoute } from './auth/SemiPrivateRoute';

const App = () => {
  const { user, token, expiresIn, refreshToken, refreshed } = useAuth();

  //Silent token refresh
  useEffect(() => {
    const silentRefresh = async () => {
      try {
        if (!user && !refreshed) {
          await refreshToken();
        } else if (expiresIn) {
          setTimeout(async () => {
            await refreshToken();
          }, expiresIn);
        }
      } catch (err) {
        console.log('Error occured in silent refresh:', err);
      }
    };
    silentRefresh();
    console.log(user, expiresIn, refreshToken);
  }, [user, expiresIn, refreshToken, refreshed]);

  return (
    <div className="app">
      <TopNav />
      <ErrorBoundary FallbackComponent={ErrorPage}>
        <Switch>
          <PrivateRoute path="/events/id/:id/manage/refund-requests">
            <RefundRequestsPage
              fetchRefundRequests={new API(token).getEventRefundRequests}
            />
          </PrivateRoute>
          <PrivateRoute path="/events/id/:id/manage">
            <ManageEventPage />
          </PrivateRoute>
          <PrivateRoute exact path="/events/id/:id/publish">
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
          <Route exact path="/events/id/:id/book" component={BookEventPage} />
          <SemiPrivateRoute path="/events/id/:id">
            <EventDetailsPage />
          </SemiPrivateRoute>
          <PrivateRoute exact path="/events/create">
            <CreateEventPage />
          </PrivateRoute>
          <PrivateRoute exact path="/events/my-events">
            <MyEventsPage />
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

          <PrivateRoute exact path="/bookings/refund-requests/:id">
            <RefundRequestsPage
              fetchRefundRequests={new API(token).getRefundRequest}
            />
          </PrivateRoute>
          <PrivateRoute path="/bookings/my-bookings/event/:id">
            <ManageBookingPage />
          </PrivateRoute>
          <PrivateRoute path="/bookings/my-bookings">
            <MyBookingsPage />
          </PrivateRoute>
          <Route
            path="/bookings/success/:id"
            component={BookingPaymentSuccessPage}
          />

          <Route path="/search" component={SearchPage} />

          <Route exact path="/">
            <Redirect to="/events" />
          </Route>

          <Route
            path="*"
            render={() => {
              throw new AppError('Page not found.', 404);
            }}
          />
        </Switch>
      </ErrorBoundary>
      <Footer />
    </div>
  );
};

export default App;
