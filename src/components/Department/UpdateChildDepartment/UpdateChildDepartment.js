import React, { useState, useRef, useEffect, useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams, Link } from "react-router-dom";

import DepartmentForm from "../DepartmentForm/DepartmentForm";
import { getDepartmentById } from "../../../api/apis";
import axios from "../../../api/axios";
import Loadingcontext from "../../../context/LoadingProvider";
import Loading from "../../Loading/Loading";

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
  const [loading, setLoading] = useContext(Loadingcontext);


  //get All Departments
  useEffect(() => {
    let isMounted = true;
    //AbortController cancel request if component unmount
    const controller = new AbortController();
    const getDepartments = getDepartmentById({
      pathname: `${DEPARTMENT}/${id}`,
      isMount: isMounted,
      state: departmentInfo,
      setState: setDepartmentInfo,
      setLoading: setLoading
    });

    getDepartments();

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

  if (loading) {
    return <Loading />;
  }

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
              textareaData={textareaData}
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
