import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Card, Pagination } from 'antd';
import Geocode from 'react-geocode';
import { getGroomerData } from '../../api/index';
Geocode.setApiKey(process.env.REACT_APP_MAP_API_KEY);
Geocode.setLanguage('en');
Geocode.setRegion('us');
const cardDescription = {
  margin: '1px',
};
const submitButtons = {
  margin: '10px',
  //Gotta decide if we want the buttons together or apart, have them apart rn and I personally like it
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

// Filter variables for animal checkbox
let dogFilter = false;
let catFilter = false;

const changeDogFilter = () => {
  dogFilter = !dogFilter;
};

const changeCatFilter = () => {
  catFilter = !catFilter;
};

const groomersPerPage = 3;
const SearchForm = props => {
  const [name, setName] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [groomers, setGroomers] = useState([]);
  const [form] = Form.useForm();
  const [pageVals, setpageVals] = useState({
    minVal: 0,
    maxVal: groomersPerPage,
  });
  // Are these needed or can we remove? VVVVV
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
  const filterDist = (lng, lat) => {
    let filtered = [];
    groomers.map(groomer => {
      if (!groomer.latitude) {
        groomer.latitude = -44.74325;
        groomer.longitude = 168.550333;
      }
      // This sets the long and lat for the given groomer from the backend
      const groomLng = parseFloat(groomer.longitude);
      const groomLat = parseFloat(groomer.latitude);

      let dist = distance(lng, lat, groomLng, groomLat, 'N');
      groomer.distance = dist;
      filtered.push(groomer);
      // if dogFilter === true

      // if catFilter === true

      // if the animal filter is in place
      // need to verify if the resulting groomer list has groomers that match
      // and filter out the ones that don't
      // probably after sorting the results, but before slicing ?

      // switch(expression) {
      //   case dogFilter === true && catFilter === true:
      //     if (groomer.cats === true && groomer.dogs === true)
      //  {   filtered.push(groomer)}

      //     case dogFilter === true:
      //       if (groomer.dogs === true) {
      //     filtered.push(groomer)
      //     }

      //       case catFilter === true:
      //         filtered.push(groomer)

      //       default:
      //        break
      //     }

      return filtered;
    });
    const sorted = filtered.sort(
      (a, b) => Math.abs(a.distance) - Math.abs(b.distance)
    );

    setGroomers(sorted);
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
  // Function for Geolocation based on browser location API
  const gelocateme = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        filterDist(long, lat);
      });
    } else {
      document.getElementById('geoavail').textContent =
        'Your current location is unavailable';
    }
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
  // Pagination handler and base settings
  // Variables can be adjusted for more items per page, etc.
  const onPageChange = value => {
    setpageVals({
      minVal: (value - 1) * groomersPerPage,
      maxVal: value * groomersPerPage,
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
            <Button type="primary" htmlType="submit" style={submitButtons}>
              Submit
            </Button>
            <Button htmlType="button" onClick={onReset} style={submitButtons}>
              Reset
            </Button>
            <Button
              type="button"
              htmlType="button"
              onClick={gelocateme}
              style={submitButtons}
            >
              Use My Location
            </Button>
            <Checkbox onChange={changeDogFilter}>Dog</Checkbox>
            <Checkbox onChange={changeCatFilter}>Cat</Checkbox>
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
        {/* Slice on initial state, Paginate onChange updates the state and shifts the slice based on the page */}
        {groomers.slice(pageVals.minVal, pageVals.maxVal).map(groomer => {
          return (
            <Link
              key={groomer.id}
              to={`/customer-dashboard/groomers/${groomer.id}`}
            >
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
      <Pagination
        defaultCurrent={1}
        total={groomers.length}
        pageSize={groomersPerPage}
        onChange={onPageChange}
      />
    </div>
  );
};
export default SearchForm;
