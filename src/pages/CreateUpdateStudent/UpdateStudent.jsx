import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";

import axios from "../../api/axios";
import { validate } from "../../validation/validate";
import StudentFrom from "../../components/StudentForm/StudentFrom";

import "./CreateUpdateStudent.css";
import Loading from "../../components/Loading/Loading";

const UpdateStudent = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const ALL_CLASSES = "/classes";
  const STUDENT = "/student";

  const [StudentById, setStudentById] = useState([]);
  const [classes, setClasses] = useState([]);

  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    errors: {
      firstName: "",
      lastName: "",
      dateOfBirth: ""
    }
  });

  const [authMsg, setAuthMsg] = useState("");
  const [classId, setClassId] = useState(0);
  const [image, setImage] = useState("");
  const [isActive, setIsActive] = useState(1);
  const [messageSuccess, setMessageSuccess] = useState("");
  const [loading, setLoading] = useState(true);

  //handle multiple api's with one call
  useEffect(() => {
    let isMounted = true;
    //AbortController cancel request if component unmount
    const controller = new AbortController();
    const getData = () => {
      let endPoints = [`${STUDENT}/${id}`, ALL_CLASSES];

      Promise.all(endPoints.map((endpoint) => axios.get(endpoint)))
        .then(([{ data: student }, { data: classes }]) => {
          console.log(student.data);
          isMounted && setClasses(classes);
          isMounted && setStudentById(student.data);
          isMounted &&
            setCredentials({
              ...credentials,
              firstName: student.data.first_name,
              lastName: student.data.last_name,
              dateOfBirth: student.data.date_of_birth
            });
          isMounted && setIsActive(student.data.is_active);
          isMounted && setClassId(student.data.class_id);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    getData();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  useEffect(() => {}, [StudentById]);

  //update student By Id
  const handleUpdate = async (e) => {
    e.preventDefault();

    var data = new FormData();
    data.append("first_name", credentials.firstName);
    data.append("last_name", credentials.lastName);
    data.append("date_of_birth", credentials.dateOfBirth);
    data.append("image", image);
    data.append("class_id", classId);
    data.append("is_active", isActive);

    try {
      const response = await axios.post(`${STUDENT}/${id}?_method=PUT`, data);
      setMessageSuccess(response.data.message);
      setTimeout(() => {
        navigate("/student", { replace: true });
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
          setCredentials({ ...credentials, errors });
        }
      }
    }
  };

  const BUTTON_NAME = "Update Student";

  const { errors } = credentials;

  const allStudentFormData = [
    {
      label: "First Name",
      type: "text",
      placeholder: "Enter First Name",
      name: "firstName",
      value: `${credentials.firstName}`,
      error: typeof errors.firstName !== "undefined" && `${errors.firstName}`
    },
    {
      label: "Last Name",
      type: "text",
      placeholder: "Enter Last Name",
      name: "lastName",
      value: `${credentials.lastName}`,
      error: typeof errors.lastName !== "undefined" && `${errors.lastName}`
    },
    {
      label: "Date Of Birth",
      type: "date",
      placeholder: "Enter your Date Of Birth",
      name: "dateOfBirth",
      value: `${credentials.dateOfBirth}`,
      error: typeof errors.lastName !== "undefined" && `${errors.dateOfBirth}`
    }
  ];

  const handleChange = (event) => {
    let errors = { ...credentials.errors };

    const { name, value } = event.target;
    validate(name, value, errors);

    setCredentials({ ...credentials, errors, [name]: value });
    setAuthMsg(false);
  };

  if (loading) {
    return <Loading/>;
  }

  return (
    <Container>
      <p className="mt-4 title">Create new Student</p>
      <Row className="center-form">
        <Row className="">
          <Col
            lg={5}
            md={6}
            sm={12}
            className="p-5 m-auto shadow-sm rounded-lg"
          >
            <StudentFrom
              credentials={credentials}
              handleSubmitButton={handleUpdate}
              setClassId={setClassId}
              setImage={setImage}
              isActive={isActive}
              setIsActive={setIsActive}
              messageSuccess={messageSuccess}
              buttonName={BUTTON_NAME}
              allClasses={classes}
              classId={classId}
              allStudentFormData={allStudentFormData}
              handleButton={handleChange}
            />
            <p>
              <span className="go-back-link">
                <Link to="/student"> {"< "}Go Back</Link>
              </span>
            </p>
          </Col>
        </Row>
      </Row>
    </Container>
  );
};

export default UpdateStudent;
