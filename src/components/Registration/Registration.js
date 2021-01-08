import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledDiv = styled.div`
  padding: 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: row;
  padding: 3%;
`;

const Registration = props => {
  return (
    <StyledDiv>
      <h2>Are you a...</h2>
      <div>
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
      </div>
    </StyledDiv>
  );
};

export default Registration;
