import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Card, Pagination } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import Geocode from 'react-geocode';
import {
  getGroomerData,
  getCustomerData,
  removeFavoriteGroomer,
  updateCustomer,
} from '../../api/index';
import { connect } from 'react-redux';

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

const { Meta } = Card;
// Haversine Algorithm for Distance Mapping via Long/Lat
function distance(lat1, lon1, lat2, lon2, unit) {
  var radlat1 = (Math.PI * lat1) / 180;
  var radlat2 = (Math.PI * lat2) / 180;
  var theta = lon1 - lon2;
  var radtheta = (Math.PI * theta) / 180;
  var dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  if (unit === 'K') {
    dist = dist * 1.609344;
  }
  if (unit === 'N') {
    dist = dist * 0.8684;
  }
  return dist;
}

// Filter variables for animal checkbox
let dogFilter = false;
let catFilter = false;

const groomersPerPage = 12;
const SearchForm = props => {
  // dogState is the dog checkbox, catState is the cat checkbox
  const [dogState, setDogState] = useState(false);
  const [catState, setCatState] = useState(false);
  const [groomers, setGroomers] = useState([]);
  const [form] = Form.useForm();
  const [pageVals, setpageVals] = useState({
    minVal: 0,
    maxVal: groomersPerPage,
  });
  const [favorites, setFavorites] = useState([]);
  const customerId = localStorage.getItem('customerId');

  // OnChange for the dog checkbox
  const changeDogFilter = () => {
    dogFilter = !dogFilter;
    setDogState(!dogState);
  };
  // OnChange for the cat checkbox
  const changeCatFilter = () => {
    catFilter = !catFilter;
    setCatState(!catState);
  };

  useEffect(() => {
    getGroomerData()
      .then(response => {
        setGroomers(response);
      })
      .catch(error => console.log(error));

    getCustomerData(customerId)
      .then(res => setFavorites(res.favorite_groomers))
      .catch(err => console.log(err));
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

      switch (true) {
        case dogFilter && catFilter:
          if (groomer.cats === true && groomer.dogs === true) {
            filtered.push(groomer);
          }
          break;

        case dogFilter:
          if (groomer.dogs === true) {
            filtered.push(groomer);
          }
          break;

        case catFilter:
          if (groomer.cats === true) {
            filtered.push(groomer);
          }
          break;

        default:
          filtered.push(groomer);
          break;
      }

      return filtered;
    });
    const sorted = filtered.sort(
      (a, b) => Math.abs(a.distance) - Math.abs(b.distance)
    );

    setGroomers(sorted.slice(0, 10));
  };
  const onFormFinish = values => {
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
    // Updates the states used for the independent checkboxes
    setCatState(false);
    setDogState(false);

    // added function from original useEffect hook to reset the groomers list upon button reset
    getGroomerData()
      .then(response => {
        setGroomers(response);
      })
      .catch(error => console.log(error));
  };

  // Pagination handler and base settings
  // Variables can be adjusted for more items per page, etc.
  const onPageChange = value => {
    setpageVals({
      minVal: (value - 1) * groomersPerPage,
      maxVal: value * groomersPerPage,
    });
  };

  const addFavGroomer = id => {
    setFavorites(oldFavorites => [...oldFavorites, id]);
    props.updateCustomer({ favorite_groomers: id }, customerId);
  };

  const removeFavGroomer = id => {
    const newFavs = favorites.filter(groomer => groomer !== id);
    setFavorites(newFavs);
    props.removeFavoriteGroomer({ favorite_groomers: id }, customerId);
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

            <Checkbox onChange={changeDogFilter} checked={dogState}>
              Dog
            </Checkbox>
            <Checkbox onChange={changeCatFilter} checked={catState}>
              Cat
            </Checkbox>
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
            // <Link
            //   key={groomer.id}
            //   to={`/customer-dashboard/groomers/${groomer.id}`}
            // >
            <div>
              <Card
                onClick={props.viewGroomer}
                hoverable
                style={{
                  width: 240,
                  margin: '10px',
                }}
                cover={<img alt="example" src={groomer.photo_url} />}
              >
                {favorites.includes(groomer.id) ? (
                  <HeartFilled
                    onClick={e => {
                      e.stopPropagation();
                      removeFavGroomer(groomer.id);
                    }}
                  />
                ) : (
                  <HeartOutlined
                    onClick={e => {
                      e.stopPropagation();
                      addFavGroomer(groomer.id);
                    }}
                  />
                )}

                <Meta title={groomer.name + ' ' + groomer.lastname}></Meta>
                <div
                  style={{
                    marginBottom: '1px',
                  }}
                >
                  <p style={cardDescription}>
                    Vet Visit Rate: ${groomer.vet_visit_rate}
                  </p>
                  {/* Conditional Render if the Groomer grooms Dogs */}
                  {groomer.dogs ? (
                    <p style={cardDescription}>We Groom Dogs!</p>
                  ) : (
                    ''
                  )}
                  {/* Conditional Render if the Groomer grooms Cats */}
                  {groomer.cats ? (
                    <p style={cardDescription}>We Groom Cats!</p>
                  ) : (
                    ''
                  )}

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
            </div>
            // </Link>
          );
        })}
      </div>
      <Pagination
        defaultCurrent={1}
        total={groomers.length}
        defaultPageSize={groomersPerPage}
        showSizeChanger={false}
        showQuickJumper={true}
        onChange={onPageChange}
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    customer: state.customerReducer.customer,
  };
};

export default connect(mapStateToProps, {
  removeFavoriteGroomer,
  updateCustomer,
})(SearchForm);
