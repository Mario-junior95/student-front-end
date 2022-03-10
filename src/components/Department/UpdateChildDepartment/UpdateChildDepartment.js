import React, { useState, useRef, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams, Link } from "react-router-dom";

import DepartmentForm from "../DepartmentForm/DepartmentForm";
import axios from "../../../api/axios";

const UpdateChildDepartment = () => {
  const errRef = useRef();
  const navigate = useNavigate();
  const { id } = useParams();

  const BUTTON_NAME = "Update Child Department";
  const DEPARTMENT = "/department";

  const [departmentInfo, setDepartmentInfo] = useState({
    name: "",
    description: "",
    errors: {
      name: "",
      description: ""
    }
  });

  const [messageSuccess, setMessageSuccess] = useState("");

  //get All Classes
  useEffect(() => {
    let isMounted = true;
    //AbortController cancel request if component unmount
    const controller = new AbortController();
    const getClasses = async () => {
      try {
        const response = await axios.get(`${DEPARTMENT}/${id}`);
        isMounted &&
          setDepartmentInfo({
            ...departmentInfo,
            name: response.data.department[0].name,
            description: response.data.department[0].description
          });
      } catch (error) {
        console.log(error);
      }
    };
    getClasses();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  //Update Department
  const handleUpdate = async (e) => {
    e.preventDefault();

    var data = new FormData();
    data.append("name", departmentInfo.name);
    data.append("description", departmentInfo.description);
    //do it later as dropdown with all parent id to switch between parents and childrens  
    // data.append("parent_id", ?);

    try {
      const response = await axios.post(
        `${DEPARTMENT}/${id}?_method=PUT`,
        data
      );
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
    },
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
      <p className="mt-4 title">Update new Child Department</p>
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
              buttonName={BUTTON_NAME}
              messageSuccess={messageSuccess}
              handleSubmitButton={handleUpdate}
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

export default UpdateChildDepartment;
