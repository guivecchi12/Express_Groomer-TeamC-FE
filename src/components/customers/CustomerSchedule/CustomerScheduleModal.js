import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import ScheduleForm from './CustomerScheduleForm';

const ScheduleModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    //Once schedule backend is setup, use this to push up appointment
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Schedule an Appointment
      </Button>
      <Modal
        title="Choose a time"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <ScheduleForm />
      </Modal>
    </>
  );
};

export default ScheduleModal;
