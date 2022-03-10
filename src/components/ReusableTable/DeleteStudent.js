import Cookies from "js-cookie";
import React from "react";
import axios from "../../api/axios";

const DeleteStudent = (props) => {
  const { deleteIcon, alt, studentId } = props;

  const STUDENT = "/student";

  //delete Student By id
  const handleDeleteStudent = async () => {
    await axios
      .delete(`${STUDENT}/${studentId}`)
      .then((response) => {
        console.log(response);
      });
  };
  return (
    <img
      src={deleteIcon}
      alt={alt}
      onClick={handleDeleteStudent}
      className="icons-cursor"
    />
  );
};

export default DeleteStudent;
