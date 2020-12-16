import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../common';
import './RenderHomePage.css';
import { Layout } from 'antd';
// new imports
import FooterComponent from '../../Layouts/Footer';
import Navigation from '../../Layouts/Navigation';
import MainPageSearch from '../../Layouts/MainPageSearch';

const { Header, Footer, Sider, Content } = Layout;

function RenderHomePage(props) {
  const { userInfo, authService } = props;
  return (
    <div>
      {/* <h1>Hi {userInfo.name} Welcome to Labs Basic SPA</h1> */}
      {/* <h1>Hi! Welcome to Labs Basic SPA</h1>
      <div>
        <ul>
          <p>
            This is an example of a common example of how we'd like for you to
            approach components.
          </p>

          <li>
            <Link to="/customer-dashboard">Customer Dashboard</Link>
          </li>
          <li>
            <Link to="/groomer-dashboard">Groomer Dashboard</Link>
          </li>

          <li>
            <Link to="/groomers">Groomers Registration</Link>
          </li>
          <li>
            <Link to="/customers">Customers Registration</Link>
          </li>
          <li>
            <Link to="/example-list">Example List of Items</Link>
          </li>
          <li>
            <Link to="/googlemap-component">Example GoogleMap component</Link>
          </li>

          <li>
            <Button
              handleClick={() => authService.logout()}
              buttonText="Logout"
            />
          </li>
        </ul>
      </div> */}
      <Layout>
        <Header>
          <Navigation />
        </Header>
        <Content>
          <MainPageSearch />
        </Content>
        <Footer>
          <FooterComponent />
        </Footer>
      </Layout>
    </div>
  );
}
export default RenderHomePage;
