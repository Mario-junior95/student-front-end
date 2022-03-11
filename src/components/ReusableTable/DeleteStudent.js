import React, { useState } from "react";
import SweetAlert from "react-bootstrap-sweetalert";

import axios from "../../api/axios";

const DeleteStudent = (props) => {
  const { deleteIcon, alt, studentId, render, setRender  , fullName} = props;

  const [alert, setAlert] = useState(false);

  const handleAlert = (alertState) => {
    setAlert(alertState);
  };

  const STUDENT = "/student";

  //delete Student By id
  const handleDeleteStudent = async () => {
    await axios.delete(`${STUDENT}/${studentId}`).then((response) => {
      handleAlert(false);
      setRender(!render);
    });
  };

  return (
    <>
      <img
        src={deleteIcon}
        alt={alt}
        onClick={() => {
          handleAlert(true);
        }}
        className="icons-cursor"
      />

      {alert && (
        <SweetAlert
          warning
          showCancel
          confirmBtnText="Yes, delete it!"
          confirmBtnBsStyle="danger"
          title="Are you sure?"
          onConfirm={handleDeleteStudent}
          onCancel={() => {
            handleAlert(false);
          }}
          focusCancelBtn
        >
          You will not be able to recover {fullName} Info!
        </SweetAlert>
      )}
    </>
  );
};

export default DeleteStudent;
