import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { getUserData } from '../../api/index.js';
import { RegistrationForm } from '../Registration';

import Home from '../Home/index';

function HomeContainer(props) {
  const { authState, authService } = useOktaAuth();
  // eslint-disable-next-line
  const [memoAuthService] = useMemo(() => [authService], []);

  useEffect(() => {
    props.getUserData(memoAuthService);
    // eslint-disable-next-line
  }, [memoAuthService]);

  // user is authenticated but fetching api response
  if (authState.isAuthenticated && props.isFetching) {
    return <props.LoadingComponent message="Fetching user profile..." />;
  }

  // okta user has been found and has a groomer profile
  else if (
    authState.isAuthenticated &&
    props.oktaUser &&
    props.groomer.length === 1
  ) {
    localStorage.setItem('groomerId', props.groomer[0].id);

    return (
      <>
        <Home authButton="groomer" />
      </>
    );
  }

  // okta user has been found and has a customer profile
  else if (
    authState.isAuthenticated &&
    props.oktaUser &&
    props.customer.length === 1
  ) {
    localStorage.setItem('customerId', props.customer[0].id);
    return (
      <>
        <Home authButton="customer" />
      </>
    );
  }

  // okta user found but has not created a profile
  else if (props.oktaUser) {
    return (
      <>
        <Home authButton="register" />
      </>
      // <Redirect to="/register" />
    );
  }

  // Need conditional for user that is not authenticated
  // brand new user should go to landing page, not register form

  // server error
  else {
    return (
      <>
        <h1>Something went wrong</h1>
        <Home />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    isFetching: state.usersReducer.isFetching,
    oktaUser: state.usersReducer.oktaUser,
    groomer: state.usersReducer.groomer,
    customer: state.usersReducer.customer,
  };
};

export default connect(mapStateToProps, { getUserData })(HomeContainer);
