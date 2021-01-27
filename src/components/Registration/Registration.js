import React from 'react';
import { connect } from 'react-redux';
import { getUserData } from '../../api/index.js';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import groomerPic from './images/female-dog-groomer-brushing.jpg';
import petOwnerPic from './images/petowner.jpg';

const StyledDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background-color: #1d2d44;
`;

const StyledDiv2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  height: 100vh;
`;

const GroomerLink = styled(Link)`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 3% 3%;
  width: 48%;
  height: 100%;
  font-size: 3em;
  color: #9ad4d6;
  background-image: url(${groomerPic});
  background-size: 140%;
  background-repeat: no-repeat;
  border-radius: 5px;
`;

const CustomerLink = styled(Link)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 3% 3%;
  width: 48%;
  font-size: 3em;
  color: #c5e8e8;
  background-image: url(${petOwnerPic});
  background-size: 157%;
  background-repeat: no-repeat;
  border-radius: 5px;
`;

const StyledH2 = styled.h2`
  margin: 0% 0% 3% 0%;
  padding: 4% 0% 1% 0%;
  font-size: 2.5em;
  color: #f0f9f9;
  width: 100%;
  height: 4%;
  background-color: #3e5c76;
  text-align: center;
`;

const Registration = props => {
  return (
    <StyledDiv>
      <StyledH2>Are you a...</StyledH2>
      <StyledDiv2>
        <GroomerLink
          to={{
            pathname: '/register/groomers',
            state: {
              email: props.oktaUser.email,
            },
          }}
        >
          Groomer
        </GroomerLink>
        <CustomerLink
          to={{
            pathname: '/register/customers',
            state: {
              email: props.oktaUser.email,
            },
          }}
        >
          Customer
        </CustomerLink>
      </StyledDiv2>
    </StyledDiv>
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
