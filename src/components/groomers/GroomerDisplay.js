import React from 'react';

const GroomerDisplay = props => {
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
