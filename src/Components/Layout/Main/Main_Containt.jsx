import React from "react";
import { Link } from "react-router-dom";
import { get_year_and_month_only } from "../../Utils/Common_Date";
import { Icon } from "@iconify/react";
const Main_Containt = ({
  add_button,
  show_Back_button,
  title,
  col_size,
  btnTitle,
  route,
  children,
  btn_modal,
  setVisible,
  handleAdd,
}) => {
  return (
    <div className="content-body">
      <div className="container-fluid mt-3">
        <div className="row">
          <div className={`card`}>
            <div className="d-flex align-items-center justify-content-between">
              <h4 className="m-0 p-3">{title}</h4>
              {btn_modal ? (
                <button onClick={handleAdd} className="submitBtn btn">
                  <Icon
                    icon="line-md:plus"
                    className="fw-bold"
                    style={{ fontSize: "20px" }}
                  />
                  &nbsp; Add
                </button>
              ) : (
                ""
              )}
              {add_button ? (
                <Link className="submitBtn btn" to={route}>
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

          <div className={`card col-${col_size} `}>
            <div className="card-body">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main_Containt;
