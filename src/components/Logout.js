import React from "react";
import Cookies from "js-cookie";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import axios from "../api/axios";

const LOGOUT = "/auth/logout";

const Logout = () => {
  const navigate = useNavigate();
  const Token = Cookies.get("token");

  const handleLogout = async () => {
    try {
      await axios
        .get(LOGOUT)
        .then((response) => {
          Cookies.remove("token");
          Cookies.remove("firstname");
          navigate("/");
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {Token && (
        <Button
          variant="default"
          className="textColor bgColor"
          type="submit"
          onClick={handleLogout}
        >
          Log Out
        </Button>
      )}
    </>
  );
};

export default Logout;
