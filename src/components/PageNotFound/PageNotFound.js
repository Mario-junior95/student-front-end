import React from "react";

import "./PageNotFound.css";

import Warning from "../../assets/icons/WarningIcon.svg";

const PageNotFound = () => {
  return (
    <div className="pageNotFound">
      <img src={Warning} alt="warning-icon" />
      <p className="title">Page Not Found!</p>
    </div>
  );
};

export default PageNotFound;
