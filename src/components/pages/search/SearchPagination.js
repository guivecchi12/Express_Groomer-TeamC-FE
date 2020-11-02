import React, { useState } from 'react';
//import ReactDOM from "react-dom";
import 'antd/dist/antd.css';
import { Card, Pagination } from 'antd';

function SearchPagination() {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(9);

  const handleChange = value => {
    if (value <= 1) {
      setMinValue(0);
      setMaxValue(9);
    } else {
      setMinValue(maxValue);
      setMaxValue(value * 9);
    }
  };

  let data = [
    { title: 'Card title1', value: 'Card content1' },
    { title: 'Card title2', value: 'Card content2' },
    { title: 'Card title3', value: 'Card content3' },
    { title: 'Card title4', value: 'Card content4' },
    { title: 'Card title5', value: 'Card content5' },
    { title: 'Card title6', value: 'Card content6' },
    { title: 'Card title7', value: 'Card content7' },
    { title: 'Card title8', value: 'Card content8' },
    { title: 'Card title9', value: 'Card content9' },
    { title: 'Card title10', value: 'Card content10' },
    { title: 'Card title11', value: 'Card content11' },
    { title: 'Card title12', value: 'Card content12' },
    { title: 'Card title13', value: 'Card content13' },
    { title: 'Card title14', value: 'Card content14' },
    { title: 'Card title15', value: 'Card content15' },
  ];

  return (
    <div>
      {data &&
        data.length > 0 &&
        data.slice(minValue, maxValue).map(val => (
          <Card
            title={val.title}
            extra={<a href="#">More</a>}
            style={{ width: 300 }}
          >
            <p>{val.value}</p>
          </Card>
        ))}
      <Pagination
        defaultCurrent={1}
        defaultPageSize={9}
        onChange={handleChange}
        total={15}
      />
    </div>
  );
}
export default SearchPagination;
