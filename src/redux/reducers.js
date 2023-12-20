import { combineReducers } from 'redux';

import { login, jsonPlaceholder } from 'services';

const reducers = { login, jsonPlaceholder };

export default combineReducers(reducers);
