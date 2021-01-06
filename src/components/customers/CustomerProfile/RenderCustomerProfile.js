import React, { useEffect, useState } from 'react';
import { Row, Col, Modal, Button, Breadcrumb, Form, Input, Card } from 'antd';
import { getGroomerData } from '../../../api/index';

const { Meta } = Card;
const cardDescription = {
  margin: '1px',
};
const DemoBox = props => (
  <p className={`height-${props.value}`}>{props.children}</p>
);

export const RenderCustomerProfile = props => {
  const [profileInfo, setProfileInfo] = useState({});
  const [message, setMessage] = useState('');
  const [groomers, setGroomers] = useState([]);

  const handleChange = e => {
    setProfileInfo({
      ...profileInfo,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    for (let input in profileInfo) {
      if (input !== 'photo_url') {
        let value = profileInfo[input];
        value = value.replace(/^\s+/, '').replace(/\s+$/, '');
        if (value === '') {
          return false;
        }
      }
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      props.updateProfile(profileInfo);
    } else {
      setMessage('This field is required');
    }
  };

  useEffect(() => {
    getGroomerData()
      .then(response => {
        setGroomers(response);
      })
      .catch(error => console.log(error));

    if (props.status === 'success') {
      props.handleProfileModalClose();
    }
    if (props.status === 'failure') {
      setMessage(props.error);
    }
  }, [props.customer, props.error, props.status]);

  return (
    <>
      <Modal
        title="Contact info"
        visible={props.contactModalVisible}
        onOk={props.handleContactModalClose}
        onCancel={props.handleContactModalClose}
        footer={[
          <Button key="back" onClick={props.handleContactModalClose}>
            Close
          </Button>,
        ]}
      >
        <p>Phone number: {props.customer.phone}</p>
        <p>Email: {props.customer.email}</p>
      </Modal>
      <Modal
        title="Edit profile"
        visible={props.profileModalVisible}
        onOk={props.handleProfileModalClose}
        onCancel={props.handleProfileModalClose}
        footer={[
          <p
            style={{ display: 'inline', marginRight: '20%', color: '#ec3944' }}
          >
            {message}
          </p>,
          <Button key="back" onClick={props.handleProfileModalClose}>
            Close
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>
            Update
          </Button>,
        ]}
      >
        <form>
          <Form.Item label="First Name" name="name">
            <Input
              name="name"
              onChange={handleChange}
              placeholder={props.customer.name}
            />
          </Form.Item>
          <Form.Item label="Last Name" name="lastname">
            <Input
              name="lastname"
              onChange={handleChange}
              placeholder={props.customer.lastname}
            />
          </Form.Item>
          <Form.Item label="Address" name="address">
            <Input
              name="address"
              onChange={handleChange}
              placeholder={props.customer.address}
            />
          </Form.Item>
          <Form.Item label="Zip Code" name="zip">
            <Input
              name="zip"
              onChange={handleChange}
              placeholder={props.customer.zip}
            />
          </Form.Item>
          <Form.Item label="City" name="city">
            <Input
              name="city"
              onChange={handleChange}
              placeholder={props.customer.city}
            />
          </Form.Item>
          <Form.Item label="State" name="state">
            <Input
              name="state"
              onChange={handleChange}
              placeholder={props.customer.state}
            />
          </Form.Item>
          <Form.Item label="Country" name="country">
            <Input
              name="country"
              onChange={handleChange}
              placeholder={props.customer.country}
            />
          </Form.Item>
          <Form.Item label="Phone Number" name="phone">
            <Input
              name="phone"
              onChange={handleChange}
              placeholder={props.customer.phone}
            />
          </Form.Item>
          <Form.Item label="Profile Picture" name="photo_url">
            <Input
              name="photo_url"
              onChange={handleChange}
              placeholder={props.customer.photo_url}
            />
          </Form.Item>
          <Form.Item label="About" name="about">
            <Input
              name="description"
              onChange={handleChange}
              placeholder={props.customer.description}
            />
          </Form.Item>
        </form>
      </Modal>
      <Breadcrumb style={{ margin: '16px 0', marginBottom: '24px' }}>
        <Breadcrumb.Item
          onClick={props.showProfileModal}
          style={{ cursor: 'pointer' }}
        >
          Edit profile
        </Breadcrumb.Item>
      </Breadcrumb>
      <Row justify="space-around" align="middle">
        <Col xs={2} sm={4} md={6} lg={8} xl={10}>
          <DemoBox value={100}>
            <img
              src={props.customer.photo_url}
              alt={props.customer.name}
              style={{
                borderRadius: '50%',
                marginBottom: '10px',
                width: '150px',
                height: '150px',
              }}
            />
            <h2 style={{ textTransform: 'capitalize' }}>
              {props.customer.name} {props.customer.lastname}
            </h2>
            <div style={{ display: 'flex' }}>
              <p style={{ textTransform: 'capitalize' }}>
                {props.customer.city}, {props.customer.state},{' '}
                {props.customer.country}
              </p>
              <span
                onClick={props.showContactModal}
                style={{
                  color: '#ec3944',
                  marginLeft: '20px',
                  cursor: 'pointer',
                }}
              >
                Contact info
              </span>
            </div>
          </DemoBox>
          <div className="customer-about-section">
            <h2>About</h2>
            <p>{props.customer.description}</p>
          </div>
        </Col>
        <Col xs={20} sm={16} md={12} lg={8} xl={4} />
        <Col xs={2} sm={4} md={6} lg={8} xl={10}>
          <DemoBox value={50}>Calendar Here</DemoBox>
          <DemoBox value={50}>Map Here</DemoBox>
        </Col>
      </Row>

      <div className="favorite-groomers">
        <h2>Favorite Groomers</h2>
        <Row>
          {groomers.map(groomer => {
            return (
              <Col>
                <Card
                  onClick={props.viewGroomer}
                  hoverable
                  style={{
                    width: 240,
                    margin: '10px',
                  }}
                  cover={<img alt="example" src={groomer.photo_url} />}
                >
                  <Meta title={groomer.name + ' ' + groomer.lastname}></Meta>
                  <div
                    style={{
                      marginBottom: '1px',
                    }}
                  >
                    <p style={cardDescription}>
                      Vet Visit Rate: ${groomer.vet_visit_rate}
                    </p>
                    <p style={cardDescription}>
                      Day Care Rate: ${groomer.day_care_rate}
                    </p>
                    <p style={cardDescription}>
                      Walk Rate: ${groomer.walk_rate}
                    </p>
                    <p style={cardDescription}>Address: {groomer.address}</p>
                    {/* Conditional Render - when Distance is calculated, show the distance in miles */}
                    {groomer.distance ? (
                      <p style={cardDescription}>
                        Distance (Miles): {Math.floor(groomer.distance)}
                      </p>
                    ) : (
                      ''
                    )}
                    <p style={cardDescription}>
                      {groomer.city}, {groomer.state} {groomer.zip}
                    </p>
                    <p style={cardDescription}>{groomer.country}</p>
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </>
  );
};
