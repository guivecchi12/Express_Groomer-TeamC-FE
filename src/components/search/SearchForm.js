import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Field,
  Form,
  Input,
  Button,
  Checkbox,
  Radio,
  Card,
  Pagination,
} from 'antd';
import SkeletonButton from 'antd/lib/skeleton/Button';
// import { SearchPagination } from './SearchPagination.js';

import Geocode from 'react-geocode';
import { getGroomerData } from '../../api/index';

Geocode.setApiKey(process.env.REACT_APP_MAP_API_KEY);
Geocode.setLanguage('en');
Geocode.setRegion('us');

const cardDescription = {
  margin: '1px',
};
const demo = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const layoutForm = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayoutForm = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const { Meta } = Card;

// Haversine Algorithm for Distance Mapping via Long/Lat
function distance(lat1, lon1, lat2, lon2, unit) {
  var radlat1 = (Math.PI * lat1) / 180;
  var radlat2 = (Math.PI * lat2) / 180;
  var radlon1 = (Math.PI * lon1) / 180;
  var radlon2 = (Math.PI * lon2) / 180;
  var theta = lon1 - lon2;
  var radtheta = (Math.PI * theta) / 180;
  var dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  if (unit == 'K') {
    dist = dist * 1.609344;
  }
  if (unit == 'N') {
    dist = dist * 0.8684;
  }

  return dist;
}

const SearchForm = () => {
  const [name, setName] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [groomers, setGroomers] = useState([]);
  const [form] = Form.useForm();

  const onFinish = values => {
    console.log('Success: groomers displayed', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Unable to retrieve data:', errorInfo);
  };
  const handleName = e => setName(e.target.value);
  const handleZipCode = e => setZipcode(e.target.value);
  const onSubmit = e => {
    e.preventDefault();
    console.log(name, zipcode);
  };

  useEffect(() => {
    getGroomerData()
      .then(response => {
        setGroomers(response);
      })
      .catch(error => console.log(error));
  }, []);

  //for the form, use the below to add a toggle option
  // const onOptionChange = (value) => {
  //   switch (value) {
  //     case 'example':
  //       form.setFieldsValue({
  //         note: 'Leave a message here',
  //       });
  //       return;
  //   }
  // };

  // function filterLocation(lat, lng, latInput, lngInput){
  //   var latOut = latInput-lat;
  //   var lngOut = lngInput-lng;
  //   distance = (lngOut.abs)*(latOut.abs)/2;
  //   return distance;
  // }

  const filterDist = (lng, lat) => {
    let filtered = [];
    groomers.map(groomer => {
      if (!groomer.latitude) {
        groomer.latitude = -44.74325;
        groomer.longitude = 168.550333;
      }

      const groomLng = parseFloat(groomer.longitude);
      const groomLat = parseFloat(groomer.latitude);

      // const distance = (lng - groomLng + (lat - groomLat)) / 2;

      let dist = distance(lng, lat, groomLng, groomLat, 'N');
      groomer.distance = dist;
      filtered.push(groomer);
      return filtered;

      // check if dog and/or cat
      // if not, filter to remove
    });
    const sorted = filtered.sort(
      (a, b) => Math.abs(a.distance) - Math.abs(b.distance)
    );

    setGroomers(sorted.slice(0, 3));
  };

  const onFormFinish = values => {
    setZipcode(values.zip);
    Geocode.fromAddress(values.zip).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        filterDist(lng, lat);
      },
      error => {
        console.error(error);
      }
    );
  };

  const onReset = e => {
    form.resetFields();
    e.preventDefault();
    // added function from original useEffect hook to reset the groomers list upon button reset
    getGroomerData()
      .then(response => {
        setGroomers(response);
      })
      .catch(error => console.log(error));
  };

  const onFill = () => {
    form.setFieldsValue({
      zip: '44101',
    });
  };

  return (
    <div>
      <div>
        <Form
          {...layoutForm}
          form={form}
          name="control-hooks"
          onFinish={onFormFinish}
        >
          <Form.Item
            name="zip"
            label="Zip Code"
            style={{
              width: 720,
              margin: 'auto',
            }}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* Can we remove this Form item entirely for cleanup? */}
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.Example !== currentValues.Example
            }
          >
            {({ getFieldValue }) => {
              return getFieldValue('Example') === 'other' ? (
                <Form.Item
                  name="customizeExample"
                  label="Customize Example"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              ) : null;
            }}
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
            <Button type="link" htmlType="button" onClick={onFill}>
              Fill form
            </Button>
            <Checkbox onChange={() => console.log('check')}>Dog</Checkbox>
            <Checkbox onChange={() => console.log('check 2.0')}>Cat</Checkbox>
          </Form.Item>
        </Form>
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          margin: '10px',
          justifyContent: 'center',
        }}
      >
        {groomers.map(groomer => {
          return (
            <Link key={groomer.id} to={`/groomers/${groomer.id}`}>
              <Card
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
                  <p style={cardDescription}>Walk Rate: ${groomer.walk_rate}</p>
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
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default SearchForm;
