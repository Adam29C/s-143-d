import React from "react";
import PagesIndex from "../../PagesIndex";

const SuperAdminProfile = () => {

  //get userdetails in localstorage
  let userdetails = JSON.parse(localStorage.getItem("userdetails"));

  
  return (
    <div className="content-body">
      <div className="container-fluid">
      {/* <h4 className="page-title-main fw-bold  mb-3 ml-2">Dashboard</h4> */}

        <div className="row justify-content-center">
          <div className="col-lg-6 col-xl-6 ">
            <div className="card">
              <div className="card-body">
                <div className="media-body">
                  <h4 className="m-0 text-center">{userdetails?.name}</h4>
                  <p className="text-muted text-center">
                    <i>{userdetails?.designation}</i>
                  </p>
                  <p className="text-muted">
                    Hi I'm {userdetails?.name} <br />
                    News Coming Soon Stay Tuned
                  </p>
                </div>
              </div>
            </div>
            <PagesIndex.SuperAdminChangePassword />
          </div>
          <div className="col-lg-6 col-xl-6">
            {" "}
            <PagesIndex.TeamMets />{" "}
          </div>
        </div>
      </div>
      <PagesIndex.Toast />
    </div>
  );
};

export default SuperAdminProfile;
