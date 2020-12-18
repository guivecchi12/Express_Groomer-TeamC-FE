import React, { useState, useEffect } from 'react';
import { Card, Pagination } from 'antd';
import { getGroomerData } from '../../api/index';
import { Link } from 'react-router-dom';
// import GroomerDispaly from '../ProfileDisplay/GroomerDisplay';
import GroomerDisplay from '../groomers/GroomerDisplay';

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

const { Meta } = Card;

const SearchForm = () => {
  const [name, setName] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [groomers, setGroomers] = useState([]);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(12);

  const handleChange = value => {
    setMinValue((value - 1) * 12);
    setMaxValue(value * 12);
  };

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
    });
  }, []);

  console.log(groomers);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', margin: '10px' }}>
      {groomers &&
        groomers.length > 0 &&
        groomers.slice(minValue, maxValue).map(groomer => (
          <Link to={`/customer-dashboard/groomers/${groomer.id}`}>
            <Card
              hoverable
              style={{
                width: 240,
                margin: '10px',
              }}
              cover={<img alt="example" src={groomer.photo_url} />}
            >
              <Meta title={groomer.name + ' ' + groomer.lastname}></Meta>
              <div style={{ marginBottom: '1px' }}>
                {GroomerDisplay(groomer)}# pass
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
          </Link>
        ))}
      <Pagination
        defaultCurrent={1}
        defaultPageSize={12}
        onChange={handleChange}
        total={100}
      />
    </div>
  );
};
export default SearchForm;
