import React from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import {API_URL} from '../../config/index';
import active from "../../assets/icons/active.svg";
import notActive from "../../assets/icons/notActive.svg";
import editIcon from "../../assets/icons/EditIcon.svg";
import deleteIcon from "../../assets/icons/DeleteIcon.svg";
import DeleteStudent from "./DeleteStudent";

import "./ReusableTable.css";

const ReusableTable = (props) => {
  const { allStudents, headers } = props;
  const navigate = useNavigate();

  const ACTIVE = 1;

  const updateStudent = (path) => {
    navigate(path);
  };

  return (
    <div className="table-outer">
      <Table striped bordered hover>
        <thead>
          <tr>
            {headers?.length &&
              headers &&
              headers?.map((headerItem, key) => {
                return <th key={key}>{headerItem}</th>;
              })}
          </tr>
        </thead>
        <tbody>
          {allStudents?.length ? (
            allStudents &&
            allStudents?.map((items, key) => {
              const IS_ACTIVE = items.is_active === ACTIVE;
              return (
                <tr key={key}>
                  <td>
                    <img
                      src={`${API_URL}/storage/${items.image}`}
                      alt="student_profile"
                    />
                  </td>
                  <td>{items.first_name}</td>
                  <td>{items.last_name}</td>
                  <td>{items.date_of_birth}</td>
                  <td>{items.classes?.name}</td>
                  <td>
                    <div className="icon-container">
                      <img
                        src={IS_ACTIVE ? active : notActive}
                        alt={IS_ACTIVE ? "active-icon" : "not active"}
                      />
                      <span className="active">{IS_ACTIVE ? "active" : "not active"}</span>
                    </div>
                  </td>
                  <td>
                    <div className="container-cell">
                      <img
                        src={editIcon}
                        alt="edit-icon"
                        className="icons-cursor"
                        onClick={() => {
                          updateStudent(`/update-student/${items.id}`);
                        }}
                      />
                      <DeleteStudent
                        deleteIcon={deleteIcon}
                        alt={"delete-icon"}
                        studentId={items.id}
                      />
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <p className="errorMessage">No Students to display</p>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default ReusableTable;
