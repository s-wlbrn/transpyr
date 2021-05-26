import React from 'react';

import { Link, useHistory } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import Dropdown from 'react-bootstrap/Dropdown';

import { useAuth } from '../../auth/use-auth';

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
    <Navbar className="navigation" variant="dark" expand="md">
      <Link to="/events" className="navbar-brand">
        T
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav">
        {user ? <UserNamePicture name={user.name} photo={user.photo} /> : null}
      </Navbar.Toggle>
      <Navbar.Collapse id="basic-navbar-nav" className="nav-contents">
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
        <Nav className="nav-content-xs">
          <Link to="/events/create-event" className="topnav-link">
            Host an event
          </Link>
          {user ? (
            <React.Fragment>
              <Link to="/users/edit-profile" className="topnav-link">
                Edit Profile
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
      <div className="nav-content-md">
        {user ? (
          <Dropdown className="signed-in-dropdown" alignRight>
            <Dropdown.Toggle as="div" id="dropdown-basic">
              <UserNamePicture name={user.name} photo={user.photo} />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Link to="/events/create-event" className="nav-link">
                Host an event
              </Link>
              <Link to="/users/edit-profile" className="nav-link">
                Edit Profile
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
          <Nav className="signed-out-content">
            <Link to="/events/create-event" className="topnav-link">
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
      </div>
    </Navbar>
  );
};
