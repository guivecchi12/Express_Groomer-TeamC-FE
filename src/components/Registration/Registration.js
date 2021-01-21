import React from 'react';
import { connect } from 'react-redux';
import { getUserData } from '../../api/index.js';
import { Link } from 'react-router-dom';

const Registration = props => {
  return (
    <div>
      <h2>Are you a...</h2>
      <Link
        to={{
          pathname: '/register/groomers',
          state: {
            email: props.oktaUser.email,
          },
        }}
      >
        Groomer
      </Link>
      <Link
        to={{
          pathname: '/register/customers',
          state: {
            email: props.oktaUser.email,
          },
        }}
      >
        Customer
      </Link>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isFetching: state.usersReducer.isFetching,
    oktaUser: state.usersReducer.oktaUser,
    groomer: state.usersReducer.groomer,
    customer: state.usersReducer.customer,
  };
};

export default connect(mapStateToProps, { getUserData })(Registration);
