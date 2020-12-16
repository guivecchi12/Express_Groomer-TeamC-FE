import axios from 'axios';
import {
  GET_CUSTOMER_INFO_START,
  GET_CUSTOMER_INFO_SUCCESS,
  GET_CUSTOMER_INFO_FAILURE,
  REGISTER_CUSTOMER_INFO_START,
  REGISTER_CUSTOMER_INFO_SUCCESS,
  REGISTER_CUSTOMER_INFO_FAILURE,
  GET_GROOMER_INFO_START,
  GET_GROOMER_INFO_SUCCESS,
  GET_GROOMER_INFO_FAILURE,
  REGISTER_GROOMER_INFO_START,
  REGISTER_GROOMER_INFO_SUCCESS,
  REGISTER_GROOMER_INFO_FAILURE,
  GET_USER_INFO_START,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAILURE,
  UPDATE_CUSTOMER_START,
  UPDATE_CUSTOMER_SUCCESS,
  UPDATE_CUSTOMER_FAILURE,
  UPDATE_GROOMER_START,
  UPDATE_GROOMER_SUCCESS,
  UPDATE_GROOMER_FAILURE,
} from './types';

let groomersReq = `${process.env.REACT_APP_API_URI}/groomers`;
let customersReq = `${process.env.REACT_APP_API_URI}/customers`;

// we will define a bunch of API calls here.
const apiUrl = `${process.env.REACT_APP_API_URI}/profiles`;

const sleep = time =>
  new Promise(resolve => {
    setTimeout(resolve, time);
  });

const getExampleData = () => {
  return axios
    .get(`https://jsonplaceholder.typicode.com/photos?albumId=1`)
    .then(response => response.data);
};

const requestGroomers = axios.get(groomersReq).catch(err => err);
const requestCustomers = axios.get(customersReq).catch(err => err);

const getUserData = memoAuthService => dispatch => {
  dispatch({ type: GET_USER_INFO_START });

  memoAuthService
    .getUser()
    .then(info => {
      // if user is authenticated we can use the authService to snag some user info.
      return axios
        .all([requestGroomers, requestCustomers])
        .then(
          axios.spread((...responses) => {
            let users = {
              groomers: responses[0].data,
              customers: responses[1].data,
            };
            dispatch({
              type: GET_USER_INFO_SUCCESS,
              payload: { users: users, oktaUser: info },
            });
          })
        )
        .catch(errors => {
          dispatch({ type: GET_USER_INFO_FAILURE, payload: errors });
        });
    })
    .catch(err => {
      dispatch({ type: GET_USER_INFO_FAILURE, payload: err });
    });
};

const getGroomerData = () => {
  return axios
    .get(`${process.env.REACT_APP_API_URI}/groomers`)
    .then(response => response.data)
    .catch(err => console.log(err));
};

const getAuthHeader = authState => {
  if (!authState.isAuthenticated) {
    throw new Error('Not authenticated');
  }
  return { Authorization: `Bearer ${authState.idToken}` };
};

const getDSData = (url, authState) => {
  // here's another way you can compose together your API calls.
  // Note the use of GetAuthHeader here is a little different than in the getProfileData call.
  const headers = getAuthHeader(authState);
  if (!url) {
    throw new Error('No URL provided');
  }
  return axios
    .get(url, { headers })
    .then(res => JSON.parse(res.data))
    .catch(err => err);
};

const apiAuthGet = authHeader => {
  return axios.get(apiUrl, { headers: authHeader });
};

const getProfileData = authState => {
  try {
    return apiAuthGet(getAuthHeader(authState)).then(response => response.data);
  } catch (error) {
    return new Promise(() => {
      console.log(error);
      return [];
    });
  }
};

const getCustomerInfo = id => dispatch => {
  dispatch({ type: GET_CUSTOMER_INFO_START });

  axios
    .get(`${process.env.REACT_APP_API_URI}/customers/${id}`)
    .then(res => {
      dispatch({ type: GET_CUSTOMER_INFO_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: GET_CUSTOMER_INFO_FAILURE, payload: err.message });
    });
};

const getGroomerInfo = id => dispatch => {
  dispatch({ type: GET_GROOMER_INFO_START });

  axios
    .get(`${process.env.REACT_APP_API_URI}/groomers/${id}`)
    .then(res => {
      dispatch({ type: GET_GROOMER_INFO_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: GET_GROOMER_INFO_FAILURE, payload: err.message });
    });
};

const registerCustomer = (data, props) => dispatch => {
  dispatch({ type: REGISTER_CUSTOMER_INFO_START });

  axios
    .post(`${process.env.REACT_APP_API_URI}/customers`, data)
    .then(res => {
      localStorage.setItem('customerId', res.data.id);
      dispatch({ type: REGISTER_CUSTOMER_INFO_SUCCESS, payload: res.data });
      props.history.push('/customer-dashboard');
    })
    .catch(err => {
      dispatch({ type: REGISTER_CUSTOMER_INFO_FAILURE, payload: err.message });
    });
};

const registerGroomer = (data, props) => dispatch => {
  dispatch({ type: REGISTER_GROOMER_INFO_START });

  axios
    .post(`${process.env.REACT_APP_API_URI}/groomers`, data)
    .then(res => {
      localStorage.setItem('groomerId', res.data.id);
      dispatch({ type: REGISTER_GROOMER_INFO_SUCCESS, payload: res.data });
      props.history.push('/groomer-dashboard');
    })
    .catch(err => {
      console.log(data);
      dispatch({ type: REGISTER_GROOMER_INFO_FAILURE, payload: err.message });
    });
};

const updateGroomer = (data, id) => dispatch => {
  dispatch({ type: UPDATE_GROOMER_START });

  axios
    .put(`${process.env.REACT_APP_API_URI}/groomers/${id}`, data)
    .then(res => {
      dispatch({ type: UPDATE_GROOMER_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: UPDATE_GROOMER_FAILURE, payload: err.message });
    });
};

const updateCustomer = (data, id) => dispatch => {
  dispatch({ type: UPDATE_CUSTOMER_START });

  axios
    .put(`${process.env.REACT_APP_API_URI}/customers/${id}`, data)
    .then(res => {
      dispatch({ type: UPDATE_CUSTOMER_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: UPDATE_CUSTOMER_FAILURE, payload: err.message });
    });
};

export {
  sleep,
  getExampleData,
  getProfileData,
  getDSData,
  getCustomerInfo,
  getGroomerInfo,
  getGroomerData,
  getUserData,
  registerCustomer,
  registerGroomer,
  updateCustomer,
  updateGroomer,
};
