import React, { useState } from 'react';
import { Button, Card, Modal } from 'antd';

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
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div className="pet-display">
      <>
        <Button
          onClick={showModal}
          type="primary"
          htmlType="submit"
          style={AddPet}
        >
          Add a new pet
        </Button>
        <Modal
          title="Basic Modal"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </>
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
