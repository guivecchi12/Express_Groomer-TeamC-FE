import React from 'react';
import { GroomerProfile } from '../GroomerProfile';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  PieChartOutlined,
  FileOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Header, Content, Sider } = Layout;

export const RenderGroomerDashboard = props => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={props.collapsed}
        onCollapse={props.onCollapse}
      >
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item
            key="1"
            icon={<PieChartOutlined />}
            onClick={props.viewHome}
          >
            Home
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<UserOutlined />}
            onClick={props.viewGroomers}
          >
            Appointments
          </Menu.Item>
          <Menu.Item
            key="3"
            icon={<FileOutlined />}
            onClick={() => props.authService.logout()}
          >
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      {props.home && (
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <GroomerProfile />
            </div>
          </Content>
        </Layout>
      )}
      {props.appointments && (
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              Groomer appointment management here
            </div>
          </Content>
        </Layout>
      )}
    </Layout>
  );
};
