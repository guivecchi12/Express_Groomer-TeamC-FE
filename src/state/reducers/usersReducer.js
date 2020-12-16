import {
  GET_USER_INFO_START,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAILURE,
} from './types';

const initialState = {
  oktaUser: {},
  groomer: {},
  customer: {},
  isFetching: false,
  error: '',
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_INFO_START:
      return {
        ...state,
        isFetching: true,
      };
    case GET_USER_INFO_SUCCESS:
      return {
        ...state,
        isFetching: false,
        oktaUser: action.payload.oktaUser,
        groomer: action.payload.users['groomers'].filter(
          user => user.email === action.payload.oktaUser.email
        ),
        customer: action.payload.users['customers'].filter(
          user => user.email === action.payload.oktaUser.email
        ),
      };
    case GET_USER_INFO_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
