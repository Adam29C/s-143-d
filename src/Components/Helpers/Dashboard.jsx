import React from "react";

const Dashboard = ({ title, icon, count, size }) => {
  return (
    <div>

          <div className="row">
            <div className={size}>
              <div className="card gradient-1">
                <div className="card-body ">
                  <h3 className="card-title text-white">{title}</h3>
                  <div className="d-inline-block">
                    <h2 className="text-white">{count}</h2>
                  
                  </div>
                  <span className="float-right display-5 opacity-5">
                    <i className={icon} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

  );
};

export default Dashboard;
