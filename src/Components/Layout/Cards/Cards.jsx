import React from "react";

const Cards = ({icon , tillnow , counts , Title , IconBGcolor , ResponsiveClass}) => {
  return (
    <>
      <div className={ResponsiveClass}>
        <div className="card-box">
          <h4 className="header-title mt-0 mb-3 text-center">{Title}</h4>
          <div className="widget-box-2">
            <div className="widget-detail-2 text-right">
              <span className="badge badge-blue badge-pill float-left mt-3 dashboard-bedge" style={{backgroundColor :IconBGcolor }}>
                <i className={icon} />
              </span>
              <h2 className="font-weight-normal mb-1" id="allUser">
               {counts}
              </h2>
              <p className="text-muted mb-3">{tillnow}</p>
            </div>
            <div className="progress progress-bar-alt-blue progress-sm">
              <div className="progress-bar bg-blue"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;
