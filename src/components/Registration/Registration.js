import React from 'react';
import { Link } from 'react-router-dom';

const Registration = props => {
  return (
    <div>
      <h2>Are you a...</h2>
      <Link
        to="/register/groomers"
        // to={{
        //   pathname: 'groomers',
        //   state: {
        //     email: props.email,
        //   },
        // }}
      >
        Groomer
      </Link>
      <Link
        to="/register/customers"
        // to={{
        //   pathname: 'customers',
        //   state: {
        //     email: props.email,
        //   },
        // }}
      >
        Customer
      </Link>
    </div>
  );
};

export default Registration;
