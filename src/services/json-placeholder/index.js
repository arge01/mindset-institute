import reactReducerAction from 'middleware/reactReducerAction';

import { TYPES } from './reducer/type';
import { services } from './services';

export const findAll = (successCallback, errorCallback, warningCallback) =>
  reactReducerAction(
    {
      loading: TYPES.PENDING,
      success: TYPES.LIST,
      error: TYPES.ERROR,
    },
    () => services.findAll(),
    successCallback,
    errorCallback,
    warningCallback
  );

export const find = (id, successCallback, errorCallback, warningCallback) =>
  reactReducerAction(
    {
      loading: TYPES.PENDING,
      success: TYPES.FIND,
      error: TYPES.ERROR,
    },
    () => services.find(id),
    successCallback,
    errorCallback,
    warningCallback
  );
