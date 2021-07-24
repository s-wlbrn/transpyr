import React, { useState, useContext, createContext } from 'react';
import myAxios from './axios.config';

const baseUrl = 'http://localhost:3000/api/users';

const authContext = createContext();

//create auth object, manage state
const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [expiresIn, setExpiresIn] = useState(null);
  const [refreshed, setRefreshed] = useState(false);

  const unmountUser = () => {
    setToken(null);
    setUser(null);
    setExpiresIn(null);
  };

  const signIn = async (email, password) => {
    try {
      const response = await myAxios().post(`${baseUrl}/signin`, {
        email,
        password,
      });
      setUser({ ...response.data.user });
      setToken(response.token);
      setExpiresIn(response.expiresIn);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const signUp = async (name, email, password, passwordConfirm) => {
    try {
      const response = await myAxios().post(`${baseUrl}/signup`, {
        name,
        email,
        password,
        passwordConfirm,
      });
      setUser({ ...response.data.user });
      setToken(response.token);
      setExpiresIn(response.expiresIn);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const refreshToken = async () => {
    if (expiresIn) {
      console.log('setting expiresIn null');
      setExpiresIn(null);
    }
    try {
      const response = await myAxios().post(`${baseUrl}/refresh-token`);
      setUser({ ...response.data.user });
      setToken(response.token);
      setRefreshed(true);
      setExpiresIn(response.expiresIn);
    } catch (err) {
      unmountUser();
      setRefreshed(true);
      return Promise.reject(err);
    }
  };

  const signOut = async () => {
    try {
      await myAxios(token).post(`${baseUrl}/revoke-token`);
      unmountUser();
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const updatePassword = async (password, newPassword, newPasswordConfirm) => {
    try {
      await myAxios(token).patch(`${baseUrl}/update-password`, {
        password,
        newPassword,
        newPasswordConfirm,
      });
      unmountUser();
    } catch (err) {
      return Promise.reject(err);
    }
  };

  return {
    user,
    token,
    expiresIn,
    refreshed,
    setUser,
    signIn,
    signUp,
    refreshToken,
    signOut,
    updatePassword,
  };
};

//invoke in component to get auth object
export const useAuth = () => {
  return useContext(authContext);
};

//Wraps app, provides auth
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default authContext;
