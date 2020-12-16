import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { RenderCustomerDashboard } from './RenderCustomerDashboard';
import { useOktaAuth } from '@okta/okta-react';

const CustomerDashboardContainer = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [home, setHome] = useState(true);
  const [profile, setProfile] = useState(false);
  const [groomers, setGroomers] = useState(false);
  const [pets, setPets] = useState(false);

  const { authService } = useOktaAuth();

  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };

  const viewHome = () => {
    setProfile(false);
    setGroomers(false);
    setPets(false);
    setHome(true);
  };

  const viewProfile = () => {
    setHome(false);
    setGroomers(false);
    setPets(false);
    setProfile(true);
  };

  const viewGroomers = () => {
    setHome(false);
    setProfile(false);
    setPets(false);
    setGroomers(true);
  };

  const viewPets = () => {
    setHome(false);
    setProfile(false);
    setGroomers(false);
    setPets(true);
  };

  return (
    <>
      <RenderCustomerDashboard
        collapsed={collapsed}
        onCollapse={onCollapse}
        home={home}
        viewHome={viewHome}
        profile={profile}
        viewProfile={viewProfile}
        groomers={groomers}
        viewGroomers={viewGroomers}
        pets={pets}
        viewPets={viewPets}
        authService={authService}
      />
      <Route
        path="/test"
        render={props => (
          <RenderCustomerDashboard
            collapsed={collapsed}
            onCollapse={onCollapse}
            home={home}
            viewHome={viewHome}
            profile={profile}
            viewProfile={viewProfile}
            groomers={groomers}
            viewGroomers={viewGroomers}
            pets={pets}
            viewPets={viewPets}
            authService={authService}
            {...props}
          />
        )}
      />
    </>
  );
};

export default CustomerDashboardContainer;
