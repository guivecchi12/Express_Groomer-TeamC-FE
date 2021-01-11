import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background-color: navy;
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
  padding: 15%;
  font-size: 3em;
  color: white;
`;

const StyledH2 = styled.h2`
  padding: 10%;
  font-size: 2.5em;
  color: white;
`;

const Registration = props => {
  return (
    <StyledDiv>
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
