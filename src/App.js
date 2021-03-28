import React, { useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

import { useAuth } from './auth/use-auth';
import myAxios from './auth/axios.config';

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

const App = () => {
  console.log('app rendering');
  const auth = useAuth();
  console.log(auth);
  useEffect(() => {
    const silentRefresh = async () => {
      if (!auth.user) {
        await auth.refreshToken();
      } else if (auth.expiresIn) {
        console.log(`refreshing in ${auth.expiresIn}ms.`);
        setTimeout(async () => {
          console.log('refreshing');
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
        <Route exact path="/events/create-event" component={CreateEventPage} />
        <Route exact path="/events/id/:id" component={EventDetailsPage} />
        <Route exact path="/events/id/:id/edit" component={EditEventPage} />
        <Route
          exact
          path="/events/id/:id/upload-photo"
          component={UploadEventPhotoPage}
        />
        <Route exact path="/users/signin">
          <SignInSignUpPage />
        </Route>
        <Route path="*">
          <ErrorPage code="404" message="Page not found." />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
