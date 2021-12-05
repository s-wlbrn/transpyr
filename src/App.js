import React, { useEffect, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

import { useAuth } from './auth/use-auth';
import { PrivateRoute } from './auth/PrivateRoute';
import AppError from './libs/AppError';
import API from './api';

import ErrorPage from './pages/error-page/error-page.component';
import { TopNav } from './components/TopNav/TopNav.component';
import { Footer } from './components/Footer/Footer.component';
import { SemiPrivateRoute } from './auth/SemiPrivateRoute';
import { LoadingResource } from './components/LoadingResource/LoadingResource.component';

const Homepage = React.lazy(() =>
  import('./pages/homepage/homepage.component')
);
const EventDetailsPage = React.lazy(() =>
  import('./pages/event-details-page/event-details-page.component')
);
const SignInSignUpPage = React.lazy(() =>
  import('./pages/signin-signup-page/signin-signup-page.component')
);
const CreateEventPage = React.lazy(() =>
  import('./pages/create-event-page/create-event-page.component')
);
const EditEventPage = React.lazy(() =>
  import('./pages/edit-event-page/edit-event-page.component')
);
const UploadEventPhotoPage = React.lazy(() =>
  import('./pages/upload-event-photo/upload-event-photo-page.component')
);
const ForgotPasswordPage = React.lazy(() =>
  import('./pages/forgot-password-page/forgot-password-page.component')
);
const BookEventPage = React.lazy(() =>
  import('./pages/book-event-page/book-event-page.component')
);
const BookingPaymentSuccessPage = React.lazy(() =>
  import(
    './pages/booking-payment-success-page/booking-payment-success-page.component'
  )
);
const PublishEventPage = React.lazy(() =>
  import('./pages/publish-event-page/publish-event-page.component')
);
const EditProfilePage = React.lazy(() =>
  import('./pages/edit-profile-page/edit-profile-page.component')
);
const EditSettingsPage = React.lazy(() =>
  import('./pages/edit-settings-page/edit-settings-page.component')
);
const UserProfilePage = React.lazy(() =>
  import('./pages/user-profile-page/user-profile-page.component')
);
const MyEventsPage = React.lazy(() =>
  import('./pages/my-events-page/my-events-page.component')
);
const ManageEventPage = React.lazy(() =>
  import('./pages/manage-event-page/manage-event-page.component')
);
const MyBookingsPage = React.lazy(() =>
  import('./pages/my-bookings-page/my-bookings-page.component')
);
const RefundRequestsPage = React.lazy(() =>
  import('./pages/refund-requests-page/RefundRequestsPage.component')
);
const ManageBookingPage = React.lazy(() =>
  import('./pages/manage-booking-page/manage-booking-page.component')
);
const SearchPage = React.lazy(() =>
  import('./pages/search-page/search-page.component')
);

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
  }, [user, expiresIn, refreshToken, refreshed]);

  return (
    <div className="app">
      <TopNav />
      <ErrorBoundary FallbackComponent={ErrorPage}>
        <Suspense fallback={<LoadingResource page>Loading...</LoadingResource>}>
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
            <Route
              path="/users/forgot-password"
              component={ForgotPasswordPage}
            />
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
        </Suspense>
      </ErrorBoundary>
      <Footer />
    </div>
  );
};

export default App;
