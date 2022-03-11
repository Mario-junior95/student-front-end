import React, { useState, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import axios from "../../../api/axios";
import DepartmentForm from "../../../components/Department/DepartmentForm/DepartmentForm";

const BUTTON_NAME = "Create Department";

const CREATE_DEPARTMENT = "/department";

const CreateDepartment = () => {
  const errRef = useRef();
  const navigate = useNavigate();

  const [departmentInfo, setDepartmentInfo] = useState({
    name: "",
    description: "",
    errors: {
      name: "",
      description: ""
    }
  });

  const [messageSuccess, setMessageSuccess] = useState("");

  //Create Department
  const handleCreate = async (e) => {
    e.preventDefault();

    var data = new FormData();
    data.append("name", departmentInfo.name);
    data.append("description", departmentInfo.description);
    data.append("parent_id", "");

    try {
      const response = await axios.post(CREATE_DEPARTMENT, data);
      setMessageSuccess(response.data.message);
      setTimeout(() => {
        navigate("/department", { replace: true });
      }, 2000);
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

          console.log(errors);
          setDepartmentInfo({ ...departmentInfo, errors });
        }
      }

      errRef.current.focus();
    }
  };

  const handleChange = (event) => {
    let errors = { ...departmentInfo.errors };

    const { name, value } = event.target;

    setDepartmentInfo({ ...departmentInfo, errors, [name]: value });
  };

  const { errors } = departmentInfo;

  const allDepartmentFormData = [
    {
      label: "Department Name",
      type: "text",
      placeholder: "Enter Department Name",
      name: "name",
      value: `${departmentInfo.name}`,
      error: typeof errors.name !== "undefined" && `${errors.name}`
    }
  ];

  const textareaData = [
    {
      label: "Description",
      type: "text",
      placeholder: "Enter A Description",
      name: "description",
      value: `${departmentInfo.description}`,
      error:
        typeof errors.description !== "undefined" && `${errors.description}`
    }
  ];

  return (
    <Container>
      <p className="mt-4 title">Create new Parent Department</p>
      <Row className="center-form">
        <Row className="">
          <Col
            lg={5}
            md={6}
            sm={12}
            className="p-5 m-auto shadow-sm rounded-lg"
          >
            <DepartmentForm
              allDepartmentFormData={allDepartmentFormData}
              departmentInfo={departmentInfo}
              setDepartmentInfo={setDepartmentInfo}
              textareaData={textareaData}
              buttonName={BUTTON_NAME}
              messageSuccess={messageSuccess}
              handleSubmitButton={handleCreate}
              handleButton={handleChange}
            />
            <p>
              <span className="go-back-link">
                <Link to="/department"> {"< "}Go Back</Link>
              </span>
            </p>
          </Col>
        </Row>
      </Row>
    </Container>
  );
};

export default CreateDepartment;
