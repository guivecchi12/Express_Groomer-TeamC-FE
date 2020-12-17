import React, { useState, useEffect } from 'react';
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
import { getGroomerData } from '../../../api/index';
import Geocode from 'react-geocode';

Geocode.setApiKey('AIzaSyDvbprCrQ-zJnjwdimEwzJHO5LULTR_vtg');
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
    getGroomerData().then(response => {
      setGroomers(response);
      // Geocode.fromAddress(groomers.zip).then(
      //   response => {
      //     const { lat, lng } = response.results[0].geometry.location;
      //     // filterLocation(lat, lng, latInput, lngInput);
      //     console.log(lat, lng);
      //   },
      //   error => {
      //     console.error(error);
      //   }
      // );
    });
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
    console.log('LONG LAT?', lng, lat);
    groomers.map(groomer => {
      const groomLng = parseInt(groomer.longitude, 10);
      const groomLat = parseInt(groomer.latitude, 10);
      console.log(groomLat, groomLng);
      const distance = (lng - groomLng + (lat - groomLat)) / 2;
      groomer.distance = distance;
      const sorted = [...groomers].sort(
        (a, b) => b[Math.abs(distance)] - a[Math.abs(distance)]
      );
      console.log('SORTED', sorted);
      const filtered = sorted.slice(0, 3);

      // check if dog and/or cat
      // if not, filter to remove
      setGroomers(filtered);
    });
    console.log('groomers, updated?', groomers);
  };

  const onFormFinish = values => {
    setZipcode(values.zip);
    console.log('On form Finish Fired');
    Geocode.fromAddress(values.zip).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        filterDist(lng, lat);
        console.log('LAT LONG AND THE GROOMERS?', lat, lng, groomers);
      },
      error => {
        console.error(error);
      }
    );

    console.log(values.zip);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({
      zip: '44101',
    });
  };
  //for the form ^^^^

  console.log(groomers);

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
          {/* <Form.Item
        name="Example"
        label="Example"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          placeholder="Use this to add options later"
          onChange={onOptionChange}
          allowClear
        >
          <Option value="example">example</Option>
        </Select>
      </Form.Item> */}

          {/* ^^^^^ this is to set an option, maybe for pet breeds or options for services? */}

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
                <p style={cardDescription}>
                  {groomer.city}, {groomer.state} {groomer.zip}
                </p>
                <p style={cardDescription}>{groomer.country}</p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
export default SearchForm;
