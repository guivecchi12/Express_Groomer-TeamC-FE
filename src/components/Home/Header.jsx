import React from 'react';
import { Row, Col, Menu, Button, Popover } from 'antd';

// import icon for logo
import { FaPaw } from 'react-icons/fa';

import { enquireScreen } from 'enquire-js';

const LOGO_URL =
  'https://gw.alipayobjects.com/zos/rmsportal/gVAKqIsuJCepKNbgbSwE.svg';

class Header extends React.Component {
  state = {
    menuVisible: false,
    menuMode: 'horizontal',
  };

  componentDidMount() {
    enquireScreen(b => {
      this.setState({ menuMode: b ? 'inline' : 'horizontal' });
    });
  }

  render() {
    const { menuMode, menuVisible } = this.state;

    const menu = (
      <Menu mode={menuMode} id="nav" key="nav">
        <Menu.Item key="home">
          <a href="#page1-wrapper">Home</a>
        </Menu.Item>
        <Menu.Item key="docs">
          <a href="#page2-wrapper">
            <span>About</span>
          </a>
        </Menu.Item>
        <Menu.Item key="components"></Menu.Item>
        {menuMode === 'inline' && (
          <Menu.Item key="preview">
            <a
              target="_blank"
              href="https://github.com/orgs/Lambda-School-Labs/teams/labspt12-express_groomer-teama/repositories"
              rel="noopener noreferrer"
            >
              some page
            </a>
          </Menu.Item>
        )}
      </Menu>
    );

    return (
      <div id="header" className="header">
        {menuMode === 'inline' ? (
          <Popover
            overlayClassName="popover-menu"
            placement="bottomRight"
            content={menu}
            trigger="click"
            visible={menuVisible}
            arrowPointAtCenter
            onVisibleChange={this.onMenuVisibleChange}
          >
            {/* <Icon
              className="nav-phone-icon"
              type="menu"
              onClick={this.handleShowMenu}
            /> */}
          </Popover>
        ) : null}
        <Row>
          <Col xxl={4} xl={5} lg={8} md={8} sm={24} xs={24}>
            <div
              id="logo"
              to="/"
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}
            >
              {/* <img src={LOGO_URL} alt="logo" /> */}
              <FaPaw
                style={{
                  color: '#AFE9E5',
                  fontSize: '3em',
                  paddingRight: '10px',
                }}
              />
              <span>Express Groomer</span>
            </div>
          </Col>
          <Col xxl={20} xl={19} lg={16} md={16} sm={0} xs={0}>
            <div className="header-meta">
              {menuMode === 'horizontal' ? <div id="menu">{menu}</div> : null}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Header;
