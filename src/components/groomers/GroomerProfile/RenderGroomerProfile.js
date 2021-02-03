import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Modal,
  Button,
  Breadcrumb,
  Form,
  Input,
  Checkbox,
  Rate,
  TimePicker,
} from 'antd';
import MyMap from '../../MyMap/MyMap';
import './style.css';
import styled from 'styled-components';

const { RangePicker } = TimePicker;

const DemoBox = props => (
  <div className={`height-${props.value}`}>{props.children}</div>
);

// styled components here
const StyledButton = styled.button`
  background-color: #3e5c76;
  min-width: 110px;
  height: 30px;
  border-radius: 20px;
  font-size: 16px;
  background-color: #3e5c76;
  border-color: #3e5c76;
  color: #f0f9f9;
`;

const InfoSection = styled.div`
  padding: 10px 0;
`;

export const RenderGroomerProfile = props => {
  const [profileInfo, setProfileInfo] = useState({});
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setProfileInfo({
      ...profileInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = e => {
    setProfileInfo({
      ...profileInfo,
      [e.target.name]: e.target.checked,
    });
  };

  const validateForm = () => {
    for (let input in profileInfo) {
      if (input !== 'photo_url') {
        let value = profileInfo[input];
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
    if (props.status === 'success') {
      props.handleProfileModalClose();
    }
    if (props.status === 'failure') {
      setMessage(props.error);
    }
  }, [props.groomer, props.error, props.status]);
  return (
    <>
      <Modal
        title="Contact info"
        visible={props.contactModalVisible}
        onOk={props.handleContactModalClose}
        onCancel={props.handleContactModalClose}
        footer={[
          <StyledButton key="back" onClick={props.handleContactModalClose}>
            Close
          </StyledButton>,
        ]}
      >
        <p>Phone number: {props.groomer.phone}</p>
        <p>Email: {props.groomer.email}</p>
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
          <StyledButton key="back" onClick={props.handleProfileModalClose}>
            Close
          </StyledButton>,
          <StyledButton key="submit" type="primary" onClick={handleSubmit}>
            Update
          </StyledButton>,
        ]}
      >
        <form>
          <p>Your Information:</p>
          <Form.Item label="First Name" name="name">
            <Input
              name="name"
              onChange={handleChange}
              placeholder={props.groomer.name}
            />
          </Form.Item>
          <Form.Item label="Last Name" name="lastname">
            <Input
              name="lastname"
              onChange={handleChange}
              placeholder={props.groomer.lastname}
            />
          </Form.Item>
          <Form.Item label="Address" name="address">
            <Input
              name="address"
              onChange={handleChange}
              placeholder={props.groomer.address}
            />
          </Form.Item>
          <Form.Item label="Zip Code" name="zip">
            <Input
              name="zip"
              onChange={handleChange}
              placeholder={props.groomer.zip}
            />
          </Form.Item>
          <Form.Item label="City" name="city">
            <Input
              name="city"
              onChange={handleChange}
              placeholder={props.groomer.city}
            />
          </Form.Item>
          <Form.Item label="State" name="state">
            <Input
              name="state"
              onChange={handleChange}
              placeholder={props.groomer.state}
            />
          </Form.Item>
          <Form.Item label="Country" name="country">
            <Input
              name="country"
              onChange={handleChange}
              placeholder={props.groomer.country}
            />
          </Form.Item>
          <Form.Item label="Phone Number" name="phone">
            <Input
              name="phone"
              onChange={handleChange}
              placeholder={props.groomer.phone}
            />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input
              name="email"
              onChange={handleChange}
              placeholder={props.groomer.email}
            />
          </Form.Item>
          <Form.Item label="Profile Picture" name="photo_url">
            <Input
              name="photo_url"
              onChange={handleChange}
              placeholder={props.groomer.photo_url}
            />
          </Form.Item>
          <Form.Item label="About Me" name="description">
            <Input
              name="description"
              onChange={handleChange}
              placeholder={props.groomer.description}
            />
          </Form.Item>
          <p>Services Offered:</p>
          <Form.Item label="Day Care" name="doesDayCare">
            <Checkbox
              name="doesDayCare"
              onChange={handleCheckboxChange}
              defaultChecked={props.groomer.doesDayCare}
            />
          </Form.Item>
          {profileInfo.doesDayCare === true && (
            <Form.Item label="Day Care Rate" name="day_care_rate">
              <Input
                name="day_care_rate"
                onChange={handleChange}
                placeholder={props.groomer.day_care_rate}
              />
            </Form.Item>
          )}
          <Form.Item label="Walks" name="doesWalks">
            <Checkbox
              name="doesWalks"
              onChange={handleCheckboxChange}
              defaultChecked={props.groomer.doesWalks}
            />
          </Form.Item>
          {profileInfo.doesWalks === true && (
            <Form.Item label="Walk Rate" name="walk_rate">
              <Input
                name="walk_rate"
                onChange={handleChange}
                placeholder={props.groomer.walk_rate}
              />
            </Form.Item>
          )}
          <Form.Item label="Vet Visits" name="doesVetVisits">
            <Checkbox
              name="doesVetVisits"
              onChange={handleCheckboxChange}
              defaultChecked={props.groomer.doesVetVisits}
            />
          </Form.Item>
          {profileInfo.doesVetVisits === true && (
            <Form.Item label="Vet Visit Rate" name="vet_visit_rate">
              <Input
                name="vet_visit_rate"
                onChange={handleChange}
                placeholder={props.groomer.vet_visit_rate}
              />
            </Form.Item>
          )}
          <p>Animals you groom:</p>
          <Form.Item label="Dogs" name="dogs">
            <Checkbox
              name="dogs"
              onChange={handleCheckboxChange}
              defaultChecked={props.groomer.dogs}
            />
          </Form.Item>
          <Form.Item label="Cats" name="cats">
            <Checkbox
              name="cats"
              onChange={handleCheckboxChange}
              defaultChecked={props.groomer.cats}
            />
          </Form.Item>
          <p>Grooming Location:</p>
          <Form.Item label="Mobile" name="mobile">
            <Checkbox
              name="mobile"
              onChange={handleCheckboxChange}
              defaultChecked={props.groomer.isMobile}
            />
          </Form.Item>
          <Form.Item label="Stationary" name="stationary">
            <Checkbox
              name="stationary"
              onChange={handleCheckboxChange}
              defaultChecked={props.groomer.isStationary}
            />
          </Form.Item>
          {/* The hours of operation are not implemented on the backend and are not functional at the moment */}
          <p>Hours of Operation:</p>
          <Form.Item label="Monday" name="mondayHours">
            <RangePicker name="mondayHours" onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Tuesday" name="tuesdayHours">
            <RangePicker name="tuesdayHours" onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Wednesday" name="wednesdayHours">
            <RangePicker name="wednesdayHours" onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Thursday" name="thursdayHours">
            <RangePicker name="thursdayHours" onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Friday" name="fridayHours">
            <RangePicker name="fridayHours" onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Saturday" name="saturdayHours">
            <RangePicker name="saturdayHours" onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Sunday" name="sundayHours">
            <RangePicker name="sundayHours" onChange={handleChange} />
          </Form.Item>
        </form>
      </Modal>
      <Row id="about" justify="space-between" align="top">
        <Col xs={24} sm={24} md={24} lg={10} xl={10}>
          <DemoBox value={100}>
            <img
              src={props.groomer.photo_url}
              alt={props.groomer.name}
              style={{
                borderRadius: '50%',
                marginBottom: '10px',
                width: '150px',
                height: '150px',
              }}
            />
            <div style={{ display: 'flex' }}>
              <h2 style={{ textTransform: 'capitalize' }}>
                {props.groomer.name} {props.groomer.lastname}
              </h2>
              <Rate style={{ marginLeft: '20px' }} />
            </div>
            <div style={{ display: 'flex' }}>
              <p style={{ textTransform: 'capitalize' }}>
                {props.groomer.city}, {props.groomer.state},{' '}
                {props.groomer.country}
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
          <InfoSection className="groomer-about-section">
            <h2>About Me</h2>
            <p>{props.groomer.description}</p>
          </InfoSection>
          {/* If the both cats and dogs are false groomer-animal-section will not display */}
          {(props.groomer.cats === false) &
          (props.groomer.dogs === false) ? null : (
            <InfoSection className="groomer-animal-section">
              <h2>Animals I Groom</h2>
              {props.groomer.dogs === true && <p>Dogs</p>}
              {props.groomer.cats === true && <p>Cats</p>}
            </InfoSection>
          )}
          {/* If the both doesDayCare, doesVetVisits, and doesWalks are false groomer-services-section will not display */}
          {(props.groomer.doesDayCare === false) &
          (props.groomer.doesVetVisits === false) &
          (props.groomer.doesWalks === false) ? null : (
            <InfoSection className="groomer-services-section">
              <h2>Services I Offer</h2>
              {props.groomer.doesDayCare === true && (
                <p>Day Care: ${props.groomer.day_care_rate} per day</p>
              )}
              {props.groomer.doesVetVisits === true && (
                <p>Vet Visit: ${props.groomer.vet_visit_rate} per visit</p>
              )}
              {props.groomer.doesWalks === true && (
                <p>Dog Walk: ${props.groomer.walk_rate} per walk</p>
              )}
            </InfoSection>
          )}
        </Col>

        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <StyledButton onClick={props.showProfileModal}>
              Edit profile
            </StyledButton>
          </div>
          <div id="calendar">
            <DemoBox value={50}>Calendar Here</DemoBox>
          </div>
          {/* If the both isMobile and isStationary are false the mobile-or-stationary section will not display */}
          {(props.groomer.isMobile === false) &
          (props.groomer.isStationary === false) ? null : (
            <InfoSection className="mobile-or-stationary">
              <h2>My Business is</h2>
              {props.groomer.isMobile === true && (
                <>
                  <p>Mobile</p>
                  <p>I'll groom your pets at your house.</p>
                </>
              )}
              {props.groomer.isStationary === true && (
                <>
                  <p>Stationary</p>
                  <p>I'll groom your pets at my shop.</p>
                </>
              )}
            </InfoSection>
          )}
          {/* Hours of operation will be displayed here once they are set up on the backend and passed in as props */}
          {props.groomer.hoursOfOperation && (
            <InfoSection className="hours-operation">
              <h2>Hours of Operation:</h2>
              <ul>
                <li>Monday: </li>
                <li>Tuesday: </li>
                <li>Wednesday: </li>
                <li>Thursday: </li>
                <li>Friday: </li>
                <li>Saturday: </li>
                <li>Sunday: </li>
              </ul>
            </InfoSection>
          )}
          {/* If the groomer has any licenses being passed in as props they can be displayed here */}
          {props.groomer.licenses && (
            <InfoSection className="groomer-licenses-section">
              <h2>My Grooming Licenses:</h2>
            </InfoSection>
          )}
        </Col>
      </Row>

      <Row id="map" justify="start" align="middle">
        <Col xs={24} sm={24} md={24} lg={10} xl={10}>
          <div id="map">
            <h2>Location</h2>
            <MyMap
              // style={{

              // }}
              zoom={10}
              initialCenter={{
                lat: -1.2884,
                lng: 36.8233,
              }}
            />
          </div>
        </Col>
      </Row>
    </>
  );
};
