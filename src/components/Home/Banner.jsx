import React from 'react';
import { BrowserRouter as Router, Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
// import GitHubButton from 'react-github-button';
// import QueueAnim from 'rc-queue-anim';
// import TweenOne from 'rc-tween-one';
import { Button } from 'antd';
// import BannerSVGAnim from './component/BannerSVGAnim';

function Banner(props) {
  const history = useHistory();

  const routeChange = () => {
    let path = `/login`;
    history.push(path);
  };

  return (
    <div className="banner-wrapper">
      <div
        className="banner-title-wrapper"
        type={props.isMobile ? 'bottom' : 'right'}
      >
        <h1 key="h1">Express Groomer</h1>
        {/* <p key="content">Please log in</p> */}
        <div key="button" className="button-wrapper">
          {/* <Link to={path="/login"} component={LoginPage}>{user.name}} /> */}
          <Button type="primary" onClick={routeChange}>
            Login
          </Button>
        </div>
      </div>
      {!props.isMobile && <div className="banner-image-wrapper"></div>}
    </div>
  );
}

Banner.propTypes = {
  isMobile: PropTypes.bool.isRequired,
};

export default Banner;
