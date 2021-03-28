import React, { useState, useContext, createContext } from 'react';
import myAxios from './axios.config';

const baseUrl = 'http://localhost:3000/api/users';

const authContext = createContext();

//create auth object, manage state
const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [expiresIn, setExpiresIn] = useState(null);

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
      return Promise.reject(err.response.message);
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
      return Promise.reject(err.response.message);
    }
  };

  const refreshToken = async () => {
    try {
      const response = await myAxios().post(`${baseUrl}/refresh-token`);
      console.log(response);
      setUser({ ...response.data.user });
      setToken(response.token);
      setExpiresIn(response.expiresIn);
    } catch (err) {
      return Promise.reject(err.response.message);
    }
  };

  const signOut = async () => {
    try {
      await myAxios(token).post(`${baseUrl}/revoke-token`);
      setToken(null);
      setUser(null);
      setExpiresIn(null);
    } catch (error) {
      console.log(error.response.message);
    }
  };

  //password reset

  return {
    user,
    token,
    expiresIn,
    signIn,
    signUp,
    refreshToken,
    signOut,
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
