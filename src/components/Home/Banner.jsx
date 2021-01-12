import React from 'react';
import { BrowserRouter as Router, Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
// import GitHubButton from 'react-github-button';
// import QueueAnim from 'rc-queue-anim';
// import TweenOne from 'rc-tween-one';
import { Form, Input, Button, Checkbox } from 'antd';
// import BannerSVGAnim from './component/BannerSVGAnim';

// import SearchForm
// import { SearchForm } from '../search';
// import FormInput as a test to see if it will render on the page correctly
// import { FormInput } from '../common';

function Banner(props) {
  const history = useHistory();

  const routeChange = () => {
    let path = `/login`;
    history.push(path);
  };

  return (
    <div className="banner-wrapper">
      {/* {props.isMobile && (
        <TweenOne animation={{ opacity: 1 }} className="banner-image-wrapper">
          <div className="home-banner-image">
            <img
              alt="banner"
              src="https://gw.alipayobjects.com/zos/rmsportal/rqKQOpnMxeJKngVvulsF.svg"
              width="100%"
            />
          </div>
        </TweenOne>
      )} */}
      <div
        className="banner-title-wrapper"
        type={props.isMobile ? 'bottom' : 'right'}
      >
        {/* <div key="line" className="title-line-wrapper">
          <div
            className="title-line"
            style={{ transform: 'translateX(-64px)' }}
          />
        </div> */}
        <h1 key="h1">Express Groomer</h1>
        {/* <p key="content">Please log in</p> */}
        <div key="button" className="button-wrapper">
          {/* <Link to={path="/login"} component={LoginPage}>{user.name}} /> */}
          <Button type="primary" onClick={routeChange}>
            Login
          </Button>
        </div>
      </div>
      {/* SEARCH FORM HERE */}
      <div className="banner-search-form">
        <h2>Find groomers near you!</h2>
        <Form>
          <div className="banner-search-zipcode-wrapper">
            <label>Zipcode:</label>
            <Input />
          </div>
          <div className="banner-checkboxes">
            <Checkbox>Dog</Checkbox>
            <Checkbox>Cat</Checkbox>
            <Checkbox>Will come to you</Checkbox>
          </div>
          <Button>Search</Button>
        </Form>
      </div>
      {/* {!props.isMobile && (
        <div className="banner-image-wrapper"><BannerSVGAnim /></div>
      )} */}
    </div>
  );
}

Banner.propTypes = {
  isMobile: PropTypes.bool /* .isRequired */,
};

export default Banner;
