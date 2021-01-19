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

const { RangePicker } = TimePicker;

const DemoBox = props => (
  <div className={`height-${props.value}`}>{props.children}</div>
);

export const RenderGroomerProfile = props => {
  // const [groomerProfileInfo, setGroomerProfileInfo] = useState({
  //   address: "",
  //   city: "",
  //   country: "",
  //   created_at: "",
  //   day_care_rate: 0,
  //   description: "",
  //   email: "",
  //   id: null,
  //   lastname: "",
  //   latitude: "",
  //   longitude: "",
  //   name: "",
  //   oktaId: null,
  //   phone: "",
  //   photo_url: "",
  //   state: "",
  //   updated_at: "",
  //   vet_visit_rate: 0,
  //   walk_rate: 0,
  //   zip: "",
  //   walks: false,
  //   day_care: false,
  //   vet_visits: false,
  //   cats: false,
  //   dogs: false,
  // });
  const [profileInfo, setProfileInfo] = useState({
    day_care: false,
    walks: false,
    vet_visits: false,
    dogs: false,
    cats: false,
    mobile: false,
    stationary: false,
    mondayHours: '',
    tuesdayHours: '',
    wednesdayHours: '',
    thursdayHours: '',
    fridayHours: '',
    saturdayHours: '',
    sundayHours: '',
  });
  const [message, setMessage] = useState('');

  console.log('RenderGroomerProfile props', props);
  console.log('RenderGroomerProfile state profileInfo', profileInfo);
  console.log('RenderGroomerProfile state message', message);
  // console.log("groomerProfileInfo", groomerProfileInfo)

  // useEffect(() => {
  //   setGroomerProfileInfo({
  //     ...props.groomer,
  //     groomerProfileInfo
  //   })
  // }, [props.groomer])

  const handleChange = e => {
    setProfileInfo({
      ...profileInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = e => {
    setProfileInfo({
      ...profileInfo,
      [e.target.name]: !e.target.value,
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
      // setGroomerProfileInfo({
      //   groomerProfileInfo,
      //   profileInfo
      // })
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
          <Button key="back" onClick={props.handleContactModalClose}>
            Close
          </Button>,
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
          <Button key="back" onClick={props.handleProfileModalClose}>
            Close
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>
            Update
          </Button>,
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
          {/* don't update the email, it causes issues */}
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
          {/* Need inputs for availability, which animals, bio, experience, etc */}
          {/* Then add places to display that information in profile */}
          {/* Make sure the backend has tables for the information */}
          {/* Set up backend locally */}
          <p>Services Offered:</p>
          <Form.Item label="Day Care" name="day_care">
            <Checkbox
              name="day_care"
              onChange={handleCheckboxChange}
              // placeholder={groomerProfileInfo.day_care}
              value={profileInfo.day_care}
            />
          </Form.Item>
          <Form.Item label="Day Care Rate" name="day_care_rate">
            <Input
              name="day_care_rate"
              onChange={handleChange}
              placeholder={props.groomer.day_care_rate}
            />
          </Form.Item>
          <Form.Item label="Walks" name="walks">
            <Checkbox
              name="walks"
              onChange={handleCheckboxChange}
              // placeholder={groomerProfileInfo.walks}
              value={profileInfo.walks}
            />
          </Form.Item>
          <Form.Item label="Walk Rate" name="walk_rate">
            <Input
              name="walk_rate"
              onChange={handleChange}
              placeholder={props.groomer.walk_rate}
            />
          </Form.Item>
          <Form.Item label="Vet Visits" name="vet_visits">
            <Checkbox
              name="vet_visits"
              onChange={handleCheckboxChange}
              // placeholder={groomerProfileInfo.vet_visits}
              value={profileInfo.vet_visits}
            />
          </Form.Item>
          <Form.Item label="Vet Visit Rate" name="vet_visit_rate">
            <Input
              name="vet_visit_rate"
              onChange={handleChange}
              placeholder={props.groomer.vet_visit_rate}
            />
          </Form.Item>
          <p>Animals you groom:</p>
          <Form.Item label="Dogs" name="dogs">
            <Checkbox
              name="dogs"
              onChange={handleCheckboxChange}
              // placeholder={groomerProfileInfo.dogs}
              value={profileInfo.dogs}
            />
          </Form.Item>
          <Form.Item label="Cats" name="cats">
            <Checkbox
              name="cats"
              onChange={handleCheckboxChange}
              // placeholder={groomerProfileInfo.cats}
              value={profileInfo.cats}
            />
          </Form.Item>
          <p>Grooming Location:</p>
          <Form.Item label="Mobile" name="mobile">
            <Checkbox
              name="mobile"
              onChange={handleCheckboxChange}
              value={profileInfo.mobile}
            />
          </Form.Item>
          <Form.Item label="Stationary" name="stationary">
            <Checkbox
              name="stationary"
              onChange={handleCheckboxChange}
              value={profileInfo.stationary}
            />
          </Form.Item>
          <p>Hours of Operation:</p>
          <Form.Item label="Monday" name="mondayHours">
            <RangePicker
              name="mondayHours"
              onChange={handleChange}
              value={profileInfo.mondayHours}
            />
          </Form.Item>
          <Form.Item label="Tuesday" name="tuesdayHours">
            <RangePicker
              name="tuesdayHours"
              onChange={handleChange}
              value={profileInfo.tuesdayHours}
            />
          </Form.Item>
          <Form.Item label="Wednesday" name="wednesdayHours">
            <RangePicker
              name="wednesdayHours"
              onChange={handleChange}
              value={profileInfo.wednesdayHours}
            />
          </Form.Item>
          <Form.Item label="Thursday" name="thursdayHours">
            <RangePicker
              name="thursdayHours"
              onChange={handleChange}
              value={profileInfo.thursdayHours}
            />
          </Form.Item>
          <Form.Item label="Friday" name="fridayHours">
            <RangePicker
              name="fridayHours"
              onChange={handleChange}
              value={profileInfo.fridayHours}
            />
          </Form.Item>
          <Form.Item label="Saturday" name="saturdayHours">
            <RangePicker
              name="saturdayHours"
              onChange={handleChange}
              value={profileInfo.saturdayHours}
            />
          </Form.Item>
          <Form.Item label="Sunday" name="sundayHours">
            <RangePicker
              name="sundayHours"
              onChange={handleChange}
              value={profileInfo.sundayHours}
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
      <Row id="about" justify="start" align="middle">
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
            <h2 style={{ textTransform: 'capitalize' }}>
              {props.groomer.name} {props.groomer.lastname}
            </h2>
            <Rate />
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
          <div className="groomer-about-section">
            <h2>About</h2>
            <p>{props.groomer.description}</p>
          </div>
          <div className="groomer-animal-section">
            <h2>Animals I Groom</h2>
            {props.groomer.dogs === true && <p>Dogs</p>}
            {props.groomer.cats === true && <p>Cats</p>}
          </div>
          <div className="groomer-services-section">
            <h2>Services I Offer:</h2>
            {props.groomer.day_care === true && (
              <p>Day Care: ${props.groomer.day_care_rate / 100} per day</p>
            )}
            {props.groomer.vet_visits === true && (
              <p>Vet Visit: ${props.groomer.vet_visit_rate / 100} per visit</p>
            )}
            {props.groomer.walks === true && (
              <p>Dog Walk: ${props.groomer.walk_rate / 100} per walk</p>
            )}
          </div>
          <div className="hours-operation">
            <h2>Hours of Operation:</h2>
            <ul>
              <li>Monday: {props.groomer.mondayHours}</li>
              <li>Tuesday: {props.groomer.tuesdayHours}</li>
              <li>Wednesday: {props.groomer.wednesdayHours}</li>
              <li>Thursday: {props.groomer.thursdayHours}</li>
              <li>Friday: {props.groomer.fridayHours}</li>
              <li>Saturday: {props.groomer.saturdayHours}</li>
              <li>Sunday: {props.groomer.sundayHours}</li>
            </ul>
          </div>
          <div className="mobile-or-stationary">
            <h2>My Business is:</h2>
            {props.groomer.mobile === true && (
              <>
                <p>Mobile</p>
                <p>I'll groom your pets at your house.</p>
              </>
            )}
            {props.groomer.stationary === true && (
              <>
                <p>Stationary</p>
                <p>I'll groom your pets at my shop.</p>
              </>
            )}
          </div>
          <div className="groomer-licenses-section">
            <h2>My Grooming Licenses:</h2>
          </div>
        </Col>

        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <div id="calendar">
            <DemoBox value={50}>Calendar Here</DemoBox>
          </div>
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
