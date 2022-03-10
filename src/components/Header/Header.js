import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


import Logout from "../Logout";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="shadow-sm p-3 header-container">
      <p className="rounded title">
        Logo<sub>Dashboard</sub>
      </p>
      <div>
        <Button
          variant="default"
          className="textColor bgColor departments-button"
          type="submit"
          onClick={()=>navigate('/department')}
        >
          Departments
        </Button>
        <Logout />
      </div>
    </div>
  );
};

export default Header;
