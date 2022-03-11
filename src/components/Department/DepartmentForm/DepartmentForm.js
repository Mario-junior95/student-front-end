import React, { useEffect, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { getDeparmentsNameAndId } from "../../../api/apis";

const DepartmentForm = (props) => {
  const {
    allDepartmentFormData,
    buttonName,
    departmentInfo,
    textareaData,
    handleButton,
    messageSuccess,
    handleSubmitButton
  } = props;
  const location = useLocation();

  const DEPARTMENT_NAMES = "/all-departments";

  const [allDepartmentsName, setAllDepartmentsName] = useState([]);

  const departmentsName = getDeparmentsNameAndId({
    pathName: DEPARTMENT_NAMES,
    setState: setAllDepartmentsName
  });

  useEffect(() => {
    departmentsName();
  }, []);

  const { errors } = departmentInfo;

  return (
    <Form>
      {messageSuccess.length > 0 && typeof errors.name !== "undefined" && (
        <Alert variant="success" show={messageSuccess ? true : false}>
          {messageSuccess}
        </Alert>
      )}
      {allDepartmentFormData &&
        allDepartmentFormData?.map((val, key) => {
          const handleRefFocus = key === 0;
          return (
            <Form.Group className="mb-4" controlId="formBasicText" key={key}>
              <Form.Label>{val.label}</Form.Label>
              <Form.Control
                type={val.type}
                placeholder={val.placeholder}
                autoFocus={handleRefFocus ? "autofocus" : null}
                name={val.name}
                value={val.value}
                onChange={(e) => handleButton(e)}
              />
              {val.error.length > 0 && (
                <span className="errorMessage">{val.error}</span>
              )}
            </Form.Group>
          );
        })}

      {textareaData &&
        textareaData?.map((val, key) => {
          return (
            <Form.Group
              className="mb-4"
              controlId="exampleForm.ControlTextarea1"
              key={key}
            >
              <Form.Label>{val.label}</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name={val.name}
                value={val.value}
                onChange={(e) => handleButton(e)}
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
        onClick={handleSubmitButton}
      >
        {buttonName}
      </Button>
    </Form>
  );
};

export default DepartmentForm;
