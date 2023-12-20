import { initialState } from '../initial';
import { TYPES } from './type';

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case TYPES.PENDING:
      return {
        ...state,
        loading: true,
        user: undefined,
        token: undefined,
      };

    case TYPES.LOGIN:
      return {
        ...state,
        loading: false,
        login: payload?.login,
        user: payload?.user,
        token: payload?.user?.token,
      };

    case TYPES.SUCCESS:
      return {
        ...state,
        loading: false,
        login: payload?.login,
        user: payload?.user,
        token: payload?.user?.token,
      };

    case TYPES.ERROR:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        error: payload,
        user: undefined,
        token: undefined,
      };

    default:
      return state;
  }
};
