import React, { useState, useEffect } from 'react';
import { getGroomerInfo } from '../../../api/index';
import axios from 'axios';

const GroomerDisplay = props => {
  const [groomers, setGroomers] = useState([]);
  const groomId = window.location.pathname.split('/groomers/').pop();

  // const getGroomerProfile = (id) => {
  //   return axios
  //     .get(`${process.env.REACT_APP_API_URI}/groomers/${id}`)
  //     .then(response => response.data)
  //     .catch(err => console.log(err));
  // };

  // useEffect(() => {
  //   getGroomerInfo(groomId).then(response => {
  //     setGroomers(response);

  //   });
  // }, []);
  console.log(getGroomerInfo(groomId));
  console.log(groomId);
  return (
    // name, location, phone#, schedule
    <div className="profile-page">
      <h3>Groomer's Name</h3>
      <div className="profile-description">
        <h4>About Me</h4>
        <p>This is where the description will go...</p>
        <ul>
          <h4>Contact: </h4>
          <li>123.456.7890</li>
        </ul>
      </div>
    </div>
  );
};

export default GroomerDisplay;
