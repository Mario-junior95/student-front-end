import Cookies from "js-cookie";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";

// import { getUser } from "../services/LoginUser";
import axios from "../api/axios";
import AuthForm from "../components/Auth/AuthForm";

const Login = () => {
  const errRef = useRef();

  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    errors: {
      email: "",
      password: ""
    }
  });

  const LOGIN_URL = "/auth/login";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      var data = new FormData();
      data.append("email", credentials.email);
      data.append("password", credentials.password);
      const response = await axios.post(LOGIN_URL, data);

      const AuthToken = response?.data?.access_token;
      const FullName = response?.data?.user;

      Cookies.set("token", AuthToken, { expires: 10 });
      Cookies.set("fullName", FullName, { expires: 10 });

      navigate("/welcome-page", { replace: true });
    
    } catch (error) {
      console.log(error);
      if (error?.response) {
        const errorCode = error.response.data.code;
        const arrayOfErrors = error.response.data.error;

        if (errorCode !== 401) {
          const keys = Object.keys(arrayOfErrors);
          const errors = {};
          // iterate over object
          keys.forEach((key, index) => {
            errors[key] = arrayOfErrors[key].toString();
          });

          setCredentials({ ...credentials, errors });
        } else {
          setCredentials({ ...credentials, errors });
        }
      }
      errRef.current.focus();
    }
  };

  const { errors } = credentials;

  const formsAuthData = [
    {
      label: "Email address",
      type: "email",
      placeholder: "Enter email",
      autoComplete: "off",
      name: "email",
      value: `${credentials.email}`,
      error: typeof errors.email !== "undefined" && `${errors.email}`
    },
    {
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
      autoComplete: "off",
      name: "password",
      value: `${credentials.password}`,
      error: typeof errors.password !== "undefined" && `${errors.password}`
    }
  ];

  const BUTTON_NAME = "Sign In";

  return (
    <Container>
      <Row className="center-form">
        <Row className="mt-5">
          <Col
            lg={5}
            md={6}
            sm={12}
            className="p-5 m-auto shadow-sm rounded-lg"
          >
            <AuthForm
              credentials={credentials}
              setCredentials={setCredentials}
              handleButton={handleLogin}
              formsAuthData={formsAuthData}
              buttonName={BUTTON_NAME}
            />
            <p>
              Need an Account?
              <br />
              <span className="Link">
                <Link to="register">Sign Up</Link>
              </span>
            </p>
          </Col>
        </Row>
      </Row>
    </Container>
  );
};

export default Login;
