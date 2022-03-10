import React from "react";
import { Button } from "react-bootstrap";

import axios from "../../../api/axios";

const DeleteDepartment = (props) => {
  const { childDepartmentId} = props;
  const DEPARTMENT = "/department";

  //delete Department By id
  const handleDeleteDepartment = async () => {
    await axios
      .delete(`${DEPARTMENT}/${childDepartmentId}`)
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <Button
      variant="default"
      className="textColor bgColor"
      type="submit"
      onClick={handleDeleteDepartment}
    >
      Delete
    </Button>
  );
};

export default DeleteDepartment;
