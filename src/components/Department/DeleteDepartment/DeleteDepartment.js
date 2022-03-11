import React from "react";
import { Button } from "react-bootstrap";

import axios from "../../../api/axios";

const DeleteDepartment = (props) => {
  const { childDepartmentId, setRender, render } = props;
  const DEPARTMENT = "/department";

  //delete Department By id
  const handleDeleteDepartment = async () => {
    await axios
      .delete(`${DEPARTMENT}/${childDepartmentId}`)
      .then((response) => {
        setRender(!render);
        console.log(response);
      });
  };

  return (
    <Button
      variant="default"
      className="textColor DeleteButton"
      type="submit"
      onClick={handleDeleteDepartment}
    >
      Delete
    </Button>
  );
};

export default DeleteDepartment;
