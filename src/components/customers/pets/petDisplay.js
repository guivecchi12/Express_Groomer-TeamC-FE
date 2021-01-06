import React from 'react';
import { Button } from 'antd';

const AddPet = {
  margin: '10px',
};

const PetDisplay = () => {
  return (
    <div className="pet-display">
      <Button type="primary" htmlType="submit" style={AddPet}>
        Add a new pet
      </Button>
      <div>Name</div>
      <div>*image of pet*</div>
      <div>Animal</div>
      <div>Breed</div>
      <div>Age</div>
      <div>Weight</div>
      <div>Personality / quirks</div>
      <div>Vaccinations</div>
    </div>
  );
};

export default PetDisplay;
