import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';

import { useAuth } from '../../auth/use-auth';

import { SearchForm } from '../SearchForm/SearchForm.component';
import { UserNamePicture } from '../UserNamePicture/UserNamePicture.component';

import './TopNav.styles.scss';

export const TopNav = () => {
  const { user, signOut } = useAuth();
  const history = useHistory();

  const signOutAndGoHome = async () => {
    await signOut();
    history.push('/events');
  };

  return (
    <Navbar as="header" className="navigation" variant="dark" expand="md">
      <Link to="/events" className="navbar-brand">
        <img
          src={require('./img/logo-white.png')}
          width="48px"
          alt="Transpyr"
        />
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav">
        {user ? <UserNamePicture name={user.name} photo={user.photo} /> : null}
      </Navbar.Toggle>
      <Navbar.Collapse id="basic-navbar-nav" className="nav-contents">
        <SearchForm />
        <Nav as="nav" className="nav-content-xs">
          <Link to="/events/create" className="topnav-link">
            Host an event
          </Link>
          {user ? (
            <React.Fragment>
              <Link to="/bookings/my-bookings" className="topnav-link">
                My bookings
              </Link>
              <Link to="/events/my-events" className="topnav-link">
                My events
              </Link>
              <Link to="/users/edit-profile" className="topnav-link">
                Edit profile
              </Link>
              <Link to="/users/settings" className="topnav-link">
                Settings
              </Link>
              <div className="topnav-link" onClick={signOutAndGoHome}>
                Sign out
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Link to="/users/signin" className="topnav-link">
                Sign in
              </Link>
              <Link to="/users/signin#register" className="topnav-link">
                Sign up
              </Link>
            </React.Fragment>
          )}
        </Nav>
      </Navbar.Collapse>
      <nav className="nav-content-md">
        {user ? (
          <Dropdown className="signed-in-dropdown" alignRight>
            <Dropdown.Toggle as="div" id="dropdown-basic">
              <UserNamePicture name={user.name} photo={user.photo} />
            </Dropdown.Toggle>

            <Dropdown.Menu as="nav">
              <Link to="/events/create" className="nav-link">
                Host an event
              </Link>
              <Link to="/bookings/my-bookings" className="nav-link">
                My bookings
              </Link>
              <Link to="/events/my-events" className="nav-link">
                My events
              </Link>
              <Link to="/users/edit-profile" className="nav-link">
                Edit profile
              </Link>
              <Link to="/users/settings" className="nav-link">
                Settings
              </Link>
              <Dropdown.Divider />
              <div className="nav-link" onClick={signOutAndGoHome}>
                Sign out
              </div>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Nav as="nav" className="signed-out-content">
            <Link to="/events/create" className="topnav-link">
              Host an event
            </Link>
            <Link to="/users/signin" className="topnav-link">
              Sign in
            </Link>
            <Link to="/users/signin#register" className="topnav-link">
              Sign up
            </Link>
          </Nav>
        )}
      </nav>
    </Navbar>
  );
};
