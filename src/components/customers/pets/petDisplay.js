import React, { useState, useffect, useEffect } from 'react';
import { Button, Card, Modal, Form, Input } from 'antd';
import {
  registerPet,
  getAllPets,
  getPet,
  updatePet,
  deletePet,
} from '../../../api/index';
import { connect } from 'react-redux';

const AddPet = {
  margin: '10px',
};

const CardStyle = {
  width: 240,
  margin: '10px',
};

const PetDisplay = props => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [petInfo, setPetInfo] = useState({
    customer_id: props.customer.id,
  });
  const [pets, setPets] = useState([]);
  console.log(props);

  useEffect(() => {
    props.getAllPets(props.customer.id);
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    props.registerPet(petInfo);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChange = e => {
    setPetInfo({
      ...petInfo,
      [e.target.name]: e.target.value,
    });
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
          <form>
            <Form.Item label="First Name" name="name">
              <Input name="name" onChange={handleChange} placeholder={'name'} />
            </Form.Item>
            <Form.Item label="Species" name="species">
              <Input
                name="species"
                onChange={handleChange}
                placeholder={'species'}
              />
            </Form.Item>
            <Form.Item label="Breed" name="breed">
              <Input
                name="breed"
                onChange={handleChange}
                placeholder={'breed'}
              />
            </Form.Item>
            <Form.Item label="Age" name="age">
              <Input name="age" onChange={handleChange} placeholder={'age'} />
            </Form.Item>
            <Form.Item label="Weight" name="weight">
              <Input
                name="weight"
                onChange={handleChange}
                placeholder={'weight'}
              />
            </Form.Item>
            <Form.Item label="Personality or quirks" name="description">
              <Input
                name="description"
                onChange={handleChange}
                placeholder={'personality'}
              />
            </Form.Item>
            <Form.Item label="Vaccinations" name="vaccinations">
              <Input
                name="vaccinations"
                onChange={handleChange}
                placeholder={'vaccinations'}
              />
            </Form.Item>
          </form>
        </Modal>
      </>
      {props.pets
        ? props.pets.map(pet => {
            return (
              <Card style={CardStyle}>
                <h1>{pet.name}</h1>
                <p>{pet.animal}</p>
                <p>{pet.breed}</p>
                <p>{pet.age}</p>
                <p>{pet.weight}</p>
                <p>{pet.description}</p>
                <p>{pet.vaccinations}</p>
              </Card>
            );
          })
        : null}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    pets: state.petReducer.pets,
    customer: state.customerReducer.customer,
  };
};

export default connect(mapStateToProps, {
  registerPet,
  getAllPets,
  getPet,
  updatePet,
  deletePet,
})(PetDisplay);
