import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import PagesIndex from "../../Pages/PagesIndex";

const Split_Main_Containt = ({
  add_button,
  title,
  btnTitle,
  route,
  cardLayouts, // Array of card layouts
}) => {
  return (
    <div className="content-body">
      <div className="container-fluid mt-3">
        <div className={`card `}>
          <div className="d-flex align-items-center justify-content-between">
            <h4 className="m-0 p-3">{title}</h4>
            {add_button ? (
              <Link className="submitBtn btn btn-primary " to={route}>
                {btnTitle === "Add" ? (
                  <>
                    <Icon
                      icon="line-md:plus"
                      className="fw-bold"
                      style={{ fontSize: "20px" }}
                    />
                    &nbsp; Add
                  </>
                ) : (
                  <>
                    <Icon
                      icon="line-md:arrow-left"
                      style={{ fontSize: "20px" }}
                    />
                    &nbsp; Back
                  </>
                )}
              </Link>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="row">
          {cardLayouts.map((layout, index) => (
            <div
              className={`col-xl-${layout.size} col-sm-12 
              
           ${layout.visiblity ? "hide d-none" : ""}`}
              key={index}
            >
              <div className="card">
                {layout.body && <div className="card-body">{layout.body}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
      <PagesIndex.Toast />
    </div>
  );
};

export default Split_Main_Containt;
