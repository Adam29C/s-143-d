import React from "react";

const BlockedUser = () => {
  return (
    <div>
      <div className="parent">
        <div className="txt1">ACCOUNT SUSPENDED</div>
        <div className="txt2">Your Account Has Been Suspended.</div>
       <div id="orbit-system">
          <div className="system">
            <div className="satellite-orbit">
              <div className="satellite">SUSPENDED</div>
            </div>
            <div className="planet">
              <img
                src="http://orig02.deviantart.net/69ab/f/2013/106/0/4/sad_man_by_agiq-d61wk0d.png"
                height="200px"
              />
            </div>
          </div>
        </div>
        <div className="txt3">For more information please </div>
        <a href="#">
          <div className="button">Contact Your Service Provider</div>
        </a>
      </div>
    </div>
  );
};

export default BlockedUser;
