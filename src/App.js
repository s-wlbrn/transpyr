import React from 'react';
import { Switch, Route, Link, NavLink } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

import Splashpage from './pages/splash/splash.component';
import Homepage from './pages/homepage/homepage.component';
import EventDetailsPage from './pages/event-details-page/event-details-page.component';
import ErrorPage from './pages/error-page/error-page.component';

import { Content } from './components/Content/Content.component';
import { TopNav } from './components/TopNav/TopNav.component';

import { Footer } from './components/Footer/Footer.component';

function App() {
  return (
    <div className="app">
      <TopNav />
      <Content>
        <Switch>
          <Route exact path="/" component={Splashpage} />
          <Route exact path="/events" component={Homepage} />
          <Route exact path="/events/:id" component={EventDetailsPage} />
          <Route path="*">
            <ErrorPage code="404" message="Page not found." />
          </Route>
        </Switch>
      </Content>
      <Footer />
    </div>
  );
}

export default App;
