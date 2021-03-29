import React from 'react';
import { Redirect, Route } from 'react-router';

import { useAuth } from './use-auth';

export const PrivateRoute = ({ children, ...rest }) => {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location, match }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/users/signin',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
