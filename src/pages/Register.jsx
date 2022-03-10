import React, { useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "../api/axios";
import AuthForm from "../components/Auth/AuthForm";

const REGISTER_URL = "/auth/register";

const Register = () => {
  const errRef = useRef();

  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    errors: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirmation: ""
    }
  });

  const handleRegister = async (e) => {
    e.preventDefault();

    var data = new FormData();
    data.append("first_name", credentials.firstName);
    data.append("last_name", credentials.lastName);
    data.append("email", credentials.email);
    data.append("password", credentials.password);
    data.append("password_confirmation", credentials.passwordConfirmation);

    try {
      const response = await axios.post(REGISTER_URL, data);

      const AuthToken = response?.data?.access_token;
      const FullName = response?.data?.user;

      Cookies.set("token", AuthToken, { expires: 10 });
      Cookies.set("fullName", FullName, { expires: 10 });
      navigate("/welcome-page", { replace: true });
    } catch (error) {
      if (error?.response) {
        const errorCode = error.response.data.code;
        const arrayOfErrors = error.response.data.error;
        if (errorCode === 422) {
          const keys = Object.keys(arrayOfErrors);
          const errors = {};
          // iterate over object
          keys.forEach((key, index) => {
            //convert string to camelCase ex: first_name --> firstName
            const convertToCamelCase = key.replace(/_([a-z])/g, (m, p1) =>
              p1.toUpperCase()
            );
            errors[convertToCamelCase] = arrayOfErrors[key].toString();
          });

          setCredentials({ ...credentials, errors });
        }
      }
      errRef.current.focus();
    }
  };

  const { errors } = credentials;

  const formsAuthData = [
    {
      label: "First Name",
      type: "text",
      placeholder: "Enter First Name",
      autoComplete: "off",
      name: "firstName",
      value: `${credentials.firstName}`,
      error: typeof errors.firstName !== "undefined" && `${errors.firstName}`
    },
    {
      label: "Last Name",
      type: "text",
      placeholder: "Enter Last Name",
      autoComplete: "off",
      name: "lastName",
      value: `${credentials.lastName}`,
      error: typeof errors.lastName !== "undefined" && `${errors.lastName}`
    },
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
    },
    {
      label: "Confirm Password",
      type: "password",
      placeholder: "Confirm your passowrd",
      autoComplete: "off",
      name: "passwordConfirmation",
      value: `${credentials.passwordConfirmation}`,
      error:
        typeof errors.passwordConfirmation !== "undefined" &&
        `${errors.passwordConfirmation}`
    }
  ];

  const BUTTON_NAME = "Sign Up";

  return (
    <Container>
      <Row className="center-form">
        <Row className="">
          <Col
            lg={5}
            md={6}
            sm={12}
            className="p-5 m-auto shadow-sm rounded-lg"
          >
            <AuthForm
              credentials={credentials}
              setCredentials={setCredentials}
              handleButton={handleRegister}
              formsAuthData={formsAuthData}
              buttonName={BUTTON_NAME}
            />
            <p>
              Already registered?
              <br />
              <span className="Link">
                <Link to="/">Sign In</Link>
              </span>
            </p>
          </Col>
        </Row>
      </Row>
    </Container>
  );
};

export default Register;
