import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { getUserData } from '../../api/index.js';
import { RegistrationForm } from '../Registration';

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
    return <Redirect to={'/groomer-dashboard'} />;
  }

  // okta user has been found and has a customer profile
  else if (
    authState.isAuthenticated &&
    props.oktaUser &&
    props.customer.length === 1
  ) {
    localStorage.setItem('customerId', props.customer[0].id);
    return <Redirect to={'/customer-dashboard'} />;
  }

  // okta user found but has not created a profile
  else if (props.oktaUser) {
    return <RegistrationForm email={props.oktaUser.email} />;
  }

  // server error
  else {
    return <h1>Something went wrong</h1>;
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
