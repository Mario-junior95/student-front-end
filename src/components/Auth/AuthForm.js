import React from "react";
import { Form, Button, Alert } from "react-bootstrap";

import { validate } from "../../validation/validate";

const AuthForm = (props) => {
  const {
    formsAuthData,
    credentials,
    setCredentials,
    handleButton,
    buttonName,
    errorMsg
  } = props;

  const handleChange = (event) => {
    let errors = { ...credentials.errors };

    const { name, value } = event.target;
    validate(name, value, errors);

    setCredentials({ ...credentials, errors, [name]: value });
  };
  return (
    <Form>
      <Alert variant="danger" show={errorMsg?.length > 0 ? true : false}>
        {errorMsg}
      </Alert>
      {formsAuthData &&
        formsAuthData?.map((val, key) => {
          const handleRefFocus = key === 0;
          return (
            <Form.Group className="mb-4" controlId="formBasicText" key={key}>
              <Form.Label>{val.label}</Form.Label>
              <Form.Control
                type={val.type}
                placeholder={val.placeholder}
                autoFocus={handleRefFocus ? "autofocus" : null}
                autoComplete={val.autoComplete}
                name={val.name}
                value={val.value}
                onChange={(e) => handleChange(e)}
              />
              {val.error.length > 0 && (
                <span className="errorMessage">{val.error}</span>
              )}
            </Form.Group>
          );
        })}
      <Button
        variant="default"
        className="bgColor textColor mb-4 buttonSize"
        type="submit"
        onClick={handleButton}
      >
        {buttonName}
      </Button>
    </Form>
  );
};

export default AuthForm;
