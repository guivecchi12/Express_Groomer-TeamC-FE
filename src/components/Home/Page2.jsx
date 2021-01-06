import React from 'react';
import { OverPack } from 'rc-scroll-anim';
import QueueAnim from 'rc-queue-anim';
//import { Button } from 'antd';

function Page2() {
  return (
    <div className="home-page page2">
      <div className="home-page-wrapper">
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
                Our mission is to connect pet owners to pet groomers. We help
                owners find the perfect groomers for their pets, and we help
                groomers advertise their services. Whether you're a pet owner or
                a pet groomer, this is the perfect place for you!
              </div>
            </div>
          </QueueAnim>
        </OverPack>
      </div>
    </div>
  );
}

export default Page2;
