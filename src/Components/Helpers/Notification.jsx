import React from "react";

const Notification = () => {
  return (
    <div>
      <li className="icons dropdown">
        <a href="javascript:void(0)" data-toggle="dropdown">
          <i className="mdi mdi-email-outline" />
          <span className="badge badge-pill gradient-1">3</span>
        </a>

        <div className="drop-down animated fadeIn dropdown-menu">
          <div className="dropdown-content-heading d-flex justify-content-between">
            <span className="">3 New Messages</span>
            <a href="javascript:void()" className="d-inline-block">
              <span className="badge badge-pill gradient-1">3</span>
            </a>
          </div>
          <div className="dropdown-content-body">
            <ul>
              <li className="notification-unread">
                <a href="javascript:void()">
                  <img
                    className="float-left mr-3 avatar-img"
                    src="/assets/images/avatar/1.jpg"
                    alt=""
                  />
                  <div className="notification-content">
                    <div className="notification-heading">Saiful Islam</div>
                    <div className="notification-timestamp">08 Hours ago</div>
                    <div className="notification-text">
                      Hi Teddy, Just wanted to let you ...
                    </div>
                  </div>
                </a>
              </li>
              <li className="notification-unread">
                <a href="javascript:void()">
                  <img
                    className="float-left mr-3 avatar-img"
                    src="/assets/images/avatar/2.jpg"
                    alt=""
                  />
                  <div className="notification-content">
                    <div className="notification-heading">Adam Smith</div>
                    <div className="notification-timestamp">08 Hours ago</div>
                    <div className="notification-text">
                      Can you do me a favour?
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a href="javascript:void()">
                  <img
                    className="float-left mr-3 avatar-img"
                    src="/assets/images/avatar/3.jpg"
                    alt=""
                  />
                  <div className="notification-content">
                    <div className="notification-heading">Barak Obama</div>
                    <div className="notification-timestamp">08 Hours ago</div>
                    <div className="notification-text">
                      Hi Teddy, Just wanted to let you ...
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a href="javascript:void()">
                  <img
                    className="float-left mr-3 avatar-img"
                    src="/assets/images/avatar/4.jpg"
                    alt=""
                  />
                  <div className="notification-content">
                    <div className="notification-heading">Hilari Clinton</div>
                    <div className="notification-timestamp">08 Hours ago</div>
                    <div className="notification-text">Hello</div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </li>
    </div>
  );
};

export default Notification;
