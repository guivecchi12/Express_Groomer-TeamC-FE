import { combineReducers } from 'redux';

import { groomerReducer } from './groomerReducers/groomerReducer';
import { customerReducer } from './customerReducers/customerReducer';
import { petReducer } from './customerReducers/petReducer';
import { usersReducer } from './usersReducer';

export const rootReducer = combineReducers({
  groomerReducer,
  customerReducer,
  usersReducer,
  petReducer,
});
