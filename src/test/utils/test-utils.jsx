import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import authContext, { ProvideAuth } from '../../auth/use-auth';

const customRender = (
  ui,
  { history = createBrowserHistory(), route = '/', auth, ...renderOptions } = {}
) => {
  history.replace(route);
  //pass custom auth provider if auth specified, otherwise use default
  const AuthProvider = (auth) => {
    return auth.auth ? (
      <authContext.Provider value={auth.auth}>{ui}</authContext.Provider>
    ) : (
      <ProvideAuth>{ui}</ProvideAuth>
    );
  };
  //wrap with BrowserRouter and AuthProvider
  const Wrapper = ({ children }) => {
    return (
      <Router history={history}>
        <AuthProvider auth={auth}>{children}</AuthProvider>
      </Router>
    );
  };

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

//re-export @testing-library/react
export * from '@testing-library/react';

//override render method
export { customRender as render };
