import React from 'react';
import { Redirect, Route } from 'react-router';
import { LoadingResource } from '../components/LoadingResource/LoadingResource.component';

import { useAuth } from './use-auth';

export const PrivateRoute = ({ children, ...rest }) => {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location, match }) =>
        !auth.refreshed ? (
          <LoadingResource />
        ) : auth.user ? (
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
