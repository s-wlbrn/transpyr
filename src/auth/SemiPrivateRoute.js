import React from 'react';
import { Route } from 'react-router';
import { LoadingResource } from '../components/LoadingResource/LoadingResource.component';

import { useAuth } from './use-auth';

export const SemiPrivateRoute = ({ children, ...rest }) => {
  const { refreshed } = useAuth();
  return (
    <Route
      {...rest}
      render={({ location, match }) =>
        //wait for result of token refresh before rendering route
        !refreshed ? (
          <LoadingResource page={true} />
        ) : (
          React.cloneElement(children, { location, match })
        )
      }
    />
  );
};
