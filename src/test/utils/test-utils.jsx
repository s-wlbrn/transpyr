import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import authContext, { ProvideAuth } from '../../auth/use-auth';

const customRender = (ui, { route = '/', auth, ...renderOptions } = {}) => {
  //pass custom auth provider if auth specified, otherwise use default
  const AuthProvider = auth ? (
    <authContext.Provider value={auth}>{ui}</authContext.Provider>
  ) : (
    ProvideAuth
  );
  //wrap with BrowserRouter and AuthProvider
  const Wrapper = ({ children }) => {
    return (
      <BrowserRouter>
        <AuthProvider>{children}</AuthProvider>
      </BrowserRouter>
    );
  };

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

//re-export @testing-library/react
export * from '@testing-library/react';

//override render method
export { customRender as render };
