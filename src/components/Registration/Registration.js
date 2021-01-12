import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import petOwnerPic from './images/female-dog-groomer-brushing.jpg';
import groomerPic from './images/petowner.jpg';

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
  justify-content: space-between;
  width: 100%;
`;

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: row;
  padding: 25% 15%;
  font-size: 3em;
  color: #f0f9f9;
`;

const StyledH2 = styled.h2`
  padding-top: 10%;
  font-size: 2.5em;
  color: #f0f9f9;
`;

const StyledGroomerImg = styled.img`
  float: left;
`;

const StyledCustImg = styled.img`
  float: right;
`;

const Registration = props => {
  return (
    <StyledDiv>
      <StyledGroomerImg src={groomerPic} />
      <StyledCustImg src={petOwnerPic} />
      <StyledH2>Are you a...</StyledH2>
      <StyledDiv2>
        <StyledLink
          to={{
            pathname: '/register/groomers',
            state: {
              email: props.email,
            },
          }}
        >
          Groomer
        </StyledLink>
        <StyledLink
          to={{
            pathname: '/register/customers',
            state: {
              email: props.email,
            },
          }}
        >
          Customer
        </StyledLink>
      </StyledDiv2>
    </StyledDiv>
  );
};

export default Registration;
