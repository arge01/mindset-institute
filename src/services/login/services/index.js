/* eslint-disable no-console */
import axios from 'axios';

import fetchConfig from '../../../middleware/fetchConfig';

const login = async (request) => {
  const response = fetchConfig('post', 'login', '', request);
  response.then((payload) => {
    const { user, token, login } = payload?.data || {};
    if (login) {
      if (user && token) {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', JSON.stringify(user));

        axios.defaults.headers.common = {
          Authorization: `Bearer ${token}`,
        };
      } else {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
      }
    } else {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
    }
  });
  response.catch((err) => console.log('err: ', err));
  return response;
};

const loginControl = (token) =>
  fetchConfig('get', 'login', '', '', { Authorization: `Bearer ${token}` });

export const services = {
  login,
  loginControl,
};
