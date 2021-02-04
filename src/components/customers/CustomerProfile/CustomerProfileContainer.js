import React, { useEffect, useState } from 'react';
import { RenderCustomerProfile } from './RenderCustomerProfile';
import { connect } from 'react-redux';
import { getCustomerInfo } from '../../../api/index';
import { updateCustomer } from '../../../api/index';
import { removeFavoriteGroomer } from '../../../api/index';

const CustomerProfileContainer = props => {
  const [contactModalVisible, setContactModalVisible] = useState(false);
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const { getCustomerInfo } = props;
  const customerId = localStorage.getItem('customerId') || 21;

  useEffect(() => {
    getCustomerInfo(customerId);
  }, [getCustomerInfo, customerId]);

  const updateProfile = data => {
    props.updateCustomer(data, customerId);
  };

  const showContactModal = () => {
    setContactModalVisible(true);
  };

  const handleContactModalClose = e => {
    setContactModalVisible(false);
  };

  const showProfileModal = () => {
    setProfileModalVisible(true);
  };

  const handleProfileModalClose = e => {
    setProfileModalVisible(false);
  };
  const removeFavGroomer = data => {
    props.removeFavoriteGroomer(data, customerId);
  };

  if (props.customer && props.customer.hasOwnProperty('name')) {
    return (
      <RenderCustomerProfile
        contactModalVisible={contactModalVisible}
        showContactModal={showContactModal}
        handleContactModalClose={handleContactModalClose}
        profileModalVisible={profileModalVisible}
        showProfileModal={showProfileModal}
        handleProfileModalClose={handleProfileModalClose}
        customer={props.customer}
        updateProfile={updateProfile}
        removeFavoriteGroomer={removeFavGroomer}
        error={props.error}
        status={props.status}
      />
    );
  } else if (props.isFetching === true) {
    return <div>Loading</div>;
  } else {
    return <div>There was a problem loading this page</div>;
  }
};

const mapStateToProps = state => {
  return {
    customer: state.customerReducer.customer,
    isFetching: state.customerReducer.isFetching,
    error: state.customerReducer.error,
    status: state.customerReducer.status,
  };
};

export default connect(mapStateToProps, {
  getCustomerInfo,
  updateCustomer,
  removeFavoriteGroomer,
})(CustomerProfileContainer);
