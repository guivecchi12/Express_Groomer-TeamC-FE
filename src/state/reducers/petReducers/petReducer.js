import {
  GET_ALL_PETS_START,
  GET_ALL_PETS_SUCCESS,
  GET_ALL_PETS_FAILURE,
  GET_PET_INFO_START,
  GET_PET_INFO_SUCCESS,
  GET_PET_INFO_FAILURE,
  REGISTER_PET_INFO_START,
  REGISTER_PET_INFO_SUCCESS,
  REGISTER_PET_INFO_FAILURE,
  UPDATE_PET_START,
  UPDATE_PET_SUCCESS,
  UPDATE_PET_FAILURE,
  DELETE_PET_START,
  DELETE_PET_SUCCESS,
  DELETE_PET_FAILURE,
} from '../types';

const initialState = {
  pets: {},
  isFetching: false,
  error: '',
  status: '',
};

export const petReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PETS_START:
      return {
        ...state,
        isFetching: true,
      };
    case GET_ALL_PETS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        PET: action.payload,
      };
    case GET_ALL_PETS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case GET_PET_INFO_START:
      return {
        ...state,
        isFetching: true,
      };
    case GET_PET_INFO_SUCCESS:
      return {
        ...state,
        isFetching: false,
        PET: action.payload,
      };
    case GET_PET_INFO_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case REGISTER_PET_INFO_START:
      return {
        ...state,
        isFetching: true,
      };
    case REGISTER_PET_INFO_SUCCESS:
      return {
        ...state,
        isFetching: false,
        PET: action.payload,
      };
    case REGISTER_PET_INFO_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case UPDATE_PET_START:
      return {
        ...state,
        isFetching: true,
      };
    case UPDATE_PET_SUCCESS:
      return {
        ...state,
        isFetching: false,
        PET: action.payload,
        status: 'success',
      };
    case UPDATE_PET_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
        status: 'failure',
      };
    case DELETE_PET_START:
      return {
        ...state,
        isFetching: true,
      };
    case DELETE_PET_SUCCESS:
      return {
        ...state,
        isFetching: false,
        PET: action.payload,
        status: 'success',
      };
    case DELETE_PET_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
        status: 'failure',
      };
    default:
      return state;
  }
};
