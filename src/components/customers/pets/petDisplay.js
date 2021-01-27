import React, { useState, useEffect } from 'react';
import { Button, Card, Modal, Form, Input, Row, Col } from 'antd';
import { registerPet, getAllPets, deletePet } from '../../../api/index';
import { connect } from 'react-redux';
import { Component } from 'react';

const AddPet = {
  margin: '10px',
};

const CardStyle = {
  width: 240,
  margin: '10px',
};

const PetDisplay = props => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pets, setPets] = useState();
  const [petInfo, setPetInfo] = useState({
    customer_id: props.customer.id,
  });

  useEffect(() => {
    console.log(props.pets);
    setPets(props.pets[0]);
  }, [props.pets[0]]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    props.registerPet(petInfo);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const deletePet = id => {
    props.deletePet(id);
    setTimeout(() => {
      window.location.reload();
    }, 500);
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
      <Row>
        {pets && pets.length > 0
          ? pets.map(pet => {
              return (
                <Col key={pet.id}>
                  <Card style={CardStyle}>
                    <p>Name: {pet.name}</p>
                    <p>Animal: {pet.animal}</p>
                    <p>Breed: {pet.breed}</p>
                    <p>Age: {pet.age}</p>
                    <p>Weight: {pet.weight}</p>
                    <p>Personality: {pet.description}</p>
                    <p>Vaccinations: {pet.vaccinations}</p>
                    <Button onClick={() => deletePet(pet.id)} danger>
                      Delete
                    </Button>
                  </Card>
                </Col>
              );
            })
          : null}
      </Row>
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
  deletePet,
})(PetDisplay);
