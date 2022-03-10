import React from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

import "./WelcomePage.css";

const WelcomePage = () => {
  return (
    <div>
      <p className="welcome">
        Welcome {Cookies.get("fullName")}{" "}
        <span>
          <Link to="/student">Click here to view students data</Link>
        </span>
      </p>
    </div>
  );
};

export default WelcomePage;
