import React, { useEffect, useState } from 'react';
import { RenderGroomerProfile } from './RenderGroomerProfile';
import { connect } from 'react-redux';
import { getGroomerInfo } from '../../../api/index';
import { updateGroomer } from '../../../api/index';

const GroomerProfileContainer = props => {
  const [contactModalVisible, setContactModalVisible] = useState(false);
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const { getGroomerInfo } = props;
  const groomerId = localStorage.getItem('groomerId');

  useEffect(() => {
    getGroomerInfo(groomerId);
  }, [getGroomerInfo, groomerId]);

  const updateProfile = data => {
    props.updateGroomer(data, groomerId);
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

  if (props.groomer && props.groomer.hasOwnProperty('name')) {
    return (
      <RenderGroomerProfile
        contactModalVisible={contactModalVisible}
        showContactModal={showContactModal}
        handleContactModalClose={handleContactModalClose}
        profileModalVisible={profileModalVisible}
        showProfileModal={showProfileModal}
        handleProfileModalClose={handleProfileModalClose}
        groomer={props.groomer}
        updateProfile={updateProfile}
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
    groomer: state.groomerReducer.groomer,
    isFetching: state.groomerReducer.isFetching,
    error: state.groomerReducer.error,
    status: state.groomerReducer.status,
  };
};

export default connect(mapStateToProps, { getGroomerInfo, updateGroomer })(
  GroomerProfileContainer
);
