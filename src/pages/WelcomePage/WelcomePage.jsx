import React from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

import "./WelcomePage.css";

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <p className="welcome">
        Welcome {Cookies.get("fullName")} <br />
        <span>
          <Link to="/student">Click here to go to Students page</Link>
        </span><br/>
        <span>
          <Link to="/department">Click here to Departments page</Link>
        </span>
      </p>
    </div>
  );
};

export default WelcomePage;
