import React from "react";
import { useNavigate } from "react-router-dom";

import Logout from "../Logout";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="shadow-sm p-3 header-container">
      <p className="rounded title icons-cursor" onClick={() => navigate("/")}>
        Logo<sub>Dashboard</sub>
      </p>
      <Logout />
    </div>
  );
};

export default Header;
