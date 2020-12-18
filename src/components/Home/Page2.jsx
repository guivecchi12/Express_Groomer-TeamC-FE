import React from 'react';
import { OverPack } from 'rc-scroll-anim';
import QueueAnim from 'rc-queue-anim';
//import { Button } from 'antd';

function Page2() {
  return (
    <div className="home-page page2">
      <div className="home-page-wrapper">
        <div className="title-line-wrapper page2-line">
          <div className="title-line" />
        </div>
        <h2>
          About <span>Express Groomer</span>
        </h2>
        <OverPack>
          <QueueAnim
            key="queue"
            type="bottom"
            leaveReverse
            className="page2-content"
          >
            {/* <p key="p" className="page-content">
              This is the about page：
            </p> */}
            <div key="code1" className="home-code">
              {/* <div>This is the about page</div> */}
              <div>
                Our mission is to help you find the perfect groomer for you!
                Find groomers near you that fit the needs of you and your dogs!
                Set up appointments and pay all through Express Groomer!
              </div>
            </div>
          </QueueAnim>
        </OverPack>
      </div>
    </div>
  );
}

export default Page2;
