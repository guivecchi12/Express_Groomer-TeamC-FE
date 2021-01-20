import React, { useState } from 'react';
import { Form, DatePicker, TimePicker, Button, Checkbox } from 'antd';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const config = {
  rules: [
    {
      type: 'object',
      required: true,
      message: 'Please select time!',
    },
  ],
};
const petChoose = {
  display: 'flex',
};

const ScheduleForm = () => {
  const onFinish = fieldsValue => {
    // Should format date value before submit.
    const rangeValue = fieldsValue['range-picker'];
    const rangeTimeValue = fieldsValue['range-time-picker'];
    const values = {
      ...fieldsValue,
      'date-picker': fieldsValue['date-picker'].format('YYYY-MM-DD'),
      'time-picker': fieldsValue['time-picker'].format('HH:mm:ss'),
    };
    console.log('Received values of form: ', values);
  };

  return (
    <Form name="time_related_controls" {...formItemLayout} onFinish={onFinish}>
      <Form.Item name="date-picker" label="Date" {...config}>
        <DatePicker />
      </Form.Item>
      <Form.Item name="time-picker" label="Time" {...config}>
        <TimePicker />
      </Form.Item>
      <div name="petChoose">
        <p>Pet:</p>
        <Checkbox onChange={() => console.log('check')}>Dog</Checkbox>
        <Checkbox onChange={() => console.log('check 2.0')}>Cat</Checkbox>
      </div>
      <Form.Item
        wrapperCol={{
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        }}
      >
        {/* <Button type="primary" htmlType="submit">
          Submit
        </Button> */}
      </Form.Item>
    </Form>
  );
};
export default ScheduleForm;
