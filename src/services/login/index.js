import reactReducerAction from 'middleware/reactReducerAction';

import { TYPES } from './reducer/type';
import { services } from './services';

export const login = (
  request,
  successCallback,
  errorCallback,
  warningCallback
) =>
  reactReducerAction(
    {
      loading: TYPES.PENDING,
      success: TYPES.LOGIN,
      error: TYPES.ERROR,
    },
    () => services.login(request),
    successCallback,
    errorCallback,
    warningCallback
  );

export const logout = () => {
  sessionStorage.removeItem('user');
  sessionStorage.removeItem('token');

  location.href = '/login';
};

export const loginControl = (
  token,
  successCallback,
  errorCallback,
  warningCallback
) =>
  reactReducerAction(
    {
      loading: TYPES.PENDING,
      success: TYPES.SUCCESS,
      error: TYPES.ERROR,
    },
    () => services.loginControl(token),
    successCallback,
    errorCallback,
    warningCallback
  );
