import React from "react";

import Warning from "../../assets/icons/WarningIcon.svg";
import "./PageNotFound.css";


const PageNotFound = () => {
  return (
    <div className="pageNotFound">
      <img src={Warning} alt="warning-icon" />
      <p className="title">Page Not Found!</p>
    </div>
  );
};

export default PageNotFound;
