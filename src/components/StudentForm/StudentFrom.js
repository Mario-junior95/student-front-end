import React from "react";
import { Form, Button, Alert } from "react-bootstrap";

import DropDown from "../DropDown";
import "./StudentForm.css";

const StudentFrom = (props) => {
  const {
    credentials,
    handleSubmitButton,
    setClassId,
    setImage,
    isActive,
    setIsActive,
    messageSuccess,
    buttonName,
    allClasses,
    classId,
    allStudentFormData,
    handleButton
  } = props;

  const handleClasses = (e) => {
    setClassId(allClasses[e.target.value].id);
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const ACTIVE = "active";

  const handleRadio = (e) => {
    e.target.value === ACTIVE ? setIsActive(1) : setIsActive(0);
  };

  const { errors } = credentials;
  return (
    <Form>
      {messageSuccess.length > 0 && typeof errors.firstName !== "undefined" && (
        <Alert variant="success" show={messageSuccess ? true : false}>
          {messageSuccess}
        </Alert>
      )}
      {allStudentFormData &&
        allStudentFormData?.map((val, key) => {
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

      <Form.Group controlId="formFile" className="mb-4">
        <Form.Label>Upload Image</Form.Label>
        <Form.Control type="file" onChange={(e) => handleImage(e)} />
        {errors?.image?.length > 0 && (
          <span className="errorMessage">{errors.image}</span>
        )}
      </Form.Group>

      <DropDown
        handleChange={(e) => handleClasses(e)}
        classes={allClasses}
        classId={classId}
      />

      <Form.Group controlId="kindOfStand" className="mb-4">
        <div className="radioButton">
          <Form.Check
            value={ACTIVE}
            type="radio"
            name="active"
            aria-label="radio 1"
            label="Active"
            defaultChecked={isActive === 1}
            onChange={(e) => handleRadio(e)}
          />

          <Form.Check
            value="notActive"
            defaultChecked={isActive === 0}
            type="radio"
            name="active"
            onChange={(e) => handleRadio(e)}
            aria-label="radio 2"
            label="not Active"
          />
        </div>
        {errors?.isActive?.length > 0 && (
          <span className="errorMessage">{errors.isActive}</span>
        )}
      </Form.Group>

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

export default StudentFrom;
