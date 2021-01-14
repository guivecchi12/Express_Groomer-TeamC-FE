import React, { useState } from 'react';
import { RenderCustomerDashboard } from './RenderCustomerDashboard';
import { useOktaAuth } from '@okta/okta-react';

const CustomerDashboardContainer = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [home, setHome] = useState(true);
  const [profile, setProfile] = useState(false);
  const [groomers, setGroomers] = useState(false);
  const [groomer, setGroomer] = useState(false);
  const [pets, setPets] = useState(false);

  const { authService } = useOktaAuth();

  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };

  const viewHome = () => {
    setProfile(false);
    setGroomers(false);
    setPets(false);
    setGroomer(false);
    setHome(true);
    setGroomer(false);
  };

  const viewProfile = () => {
    setHome(false);
    setGroomers(false);
    setPets(false);
    setGroomer(false);
    setProfile(true);
    setGroomer(false);
  };

  const viewGroomers = () => {
    setHome(false);
    setProfile(false);
    setPets(false);
    setGroomer(false);
    setGroomers(true);
    setGroomer(false);
  };

  const viewGroomer = () => {
    setHome(false);
    setProfile(false);
    setPets(false);
    setGroomers(false);
    setGroomer(true);
  };

  const viewPets = () => {
    setHome(false);
    setProfile(false);
    setGroomers(false);
    setGroomer(false);
    setPets(true);
  };

  return (
    <RenderCustomerDashboard
      collapsed={collapsed}
      onCollapse={onCollapse}
      home={home}
      viewHome={viewHome}
      profile={profile}
      viewProfile={viewProfile}
      groomers={groomers}
      groomer={groomer}
      viewGroomers={viewGroomers}
      viewGroomer={viewGroomer}
      pets={pets}
      viewPets={viewPets}
      authService={authService}
    />
  );
};

export default CustomerDashboardContainer;
