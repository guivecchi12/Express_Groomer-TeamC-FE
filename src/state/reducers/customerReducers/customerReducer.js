import {
  GET_CUSTOMER_INFO_START,
  GET_CUSTOMER_INFO_SUCCESS,
  GET_CUSTOMER_INFO_FAILURE,
  GET_CUSTOMER_PETS,
  GET_FAVORITE_GROOMERS,
  REGISTER_CUSTOMER_INFO_START,
  REGISTER_CUSTOMER_INFO_SUCCESS,
  REGISTER_CUSTOMER_INFO_FAILURE,
  UPDATE_CUSTOMER_START,
  UPDATE_CUSTOMER_SUCCESS,
  UPDATE_CUSTOMER_FAILURE,
} from '../types';

const initialState = {
  customer: {},
  pets: {},
  isFetching: false,
  error: '',
  status: '',
};

export const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CUSTOMER_INFO_START:
      return {
        ...state,
        isFetching: true,
      };
    case GET_CUSTOMER_INFO_SUCCESS:
      return {
        ...state,
        isFetching: false,
        customer: action.payload,
      };
    case GET_CUSTOMER_INFO_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case GET_FAVORITE_GROOMERS:
      return {
        ...state,
        isFetching: false,
        customer: action.payload,
        status: 'success',
      };
    case REGISTER_CUSTOMER_INFO_START:
      return {
        ...state,
        isFetching: true,
      };
    case REGISTER_CUSTOMER_INFO_SUCCESS:
      return {
        ...state,
        isFetching: false,
        customer: action.payload,
      };
    case REGISTER_CUSTOMER_INFO_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case UPDATE_CUSTOMER_START:
      return {
        ...state,
        isFetching: true,
      };
    case UPDATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        customer: action.payload,
        status: 'success',
      };
    case UPDATE_CUSTOMER_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
        status: 'failure',
      };
    case GET_CUSTOMER_PETS:
      return {
        ...state,
        isFetching: false,
        pets: action.payload,
        status: 'success',
      };
    default:
      return state;
  }
};
