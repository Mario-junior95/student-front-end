import React from "react";
import { Form } from "react-bootstrap";

const DropDown = (props) => {
  const { classes, handleChange, classId } = props;
  return (
    <Form.Control
      className="mb-4"
      as="select"
      custom
      onChange={handleChange}
      value={classId - 1}
    >
      <option>Select A Class</option>
      {classes &&
        classes?.map((val, key) => {
          return <option value={key}>{val.name}</option>;
        })}
    </Form.Control>
  );
};

export default DropDown;
