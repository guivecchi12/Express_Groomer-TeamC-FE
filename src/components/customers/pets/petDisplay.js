import React from 'react';
import { Button, Card } from 'antd';

const AddPet = {
  margin: '10px',
};

const CardStyle = {
  width: 240,
  margin: '10px',
};

const pets = [
  {
    name: 'name',
    image: 'image',
    animal: 'animal',
    breed: 'breed',
    age: 'age',
    weight: 'weight',
    personality: 'personality',
    vaccinations: 'vaccinations',
  },
  {
    name: 'name',
    image: 'image',
    animal: 'animal',
    breed: 'breed',
    age: 'age',
    weight: 'weight',
    personality: 'personality',
    vaccinations: 'vaccinations',
  },
  {
    name: 'name',
    image: 'image',
    animal: 'animal',
    breed: 'breed',
    age: 'age',
    weight: 'weight',
    personality: 'personality',
    vaccinations: 'vaccinations',
  },
];

const PetDisplay = () => {
  return (
    <div className="pet-display">
      <Button type="primary" htmlType="submit" style={AddPet}>
        Add a new pet
      </Button>
      {pets.map(pet => {
        return (
          <Card style={CardStyle}>
            <h1>{pet.name}</h1>
            <p>{pet.image}</p>
            <p>{pet.animal}</p>
            <p>{pet.breed}</p>
            <p>{pet.age}</p>
            <p>{pet.weight}</p>
            <p>{pet.personality}</p>
            <p>{pet.vaccinations}</p>
          </Card>
        );
      })}
    </div>
  );
};

export default PetDisplay;
