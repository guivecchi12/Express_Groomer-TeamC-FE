import React, { useState, useEffect } from 'react';
import { getGroomerInfo } from '../../api/index';
const GroomerDisplay = props => {
  const [groomer, setGroomer] = useState([]);
  const groomId = window.location.pathname.split('/groomers/').pop();

  console.log(props);
  return (
    // name, location, phone#, schedule
    <div className="profile-page">
      <span>Add to Favorites</span>
      <h3>Groomer's Name</h3>
      <div className="profile-description">
        <h4>About Me </h4>
        <h4>User Id: {groomId}</h4>
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
