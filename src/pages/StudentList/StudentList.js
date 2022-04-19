import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Container, Form, Button } from "react-bootstrap";

import { getAllDataStudents } from "../../api/apis";
import ReusableTable from "../../components/ReusableTable/ReusableTable";
import CustomPagination from "../../components/Pagination/CustomPagination";

import active from "../../assets/icons/active.svg";
import notActive from "../../assets/icons/notActive.svg";

import editIcon from "../../assets/icons/EditIcon.svg";
import deleteIcon from "../../assets/icons/DeleteIcon.svg";
import DeleteStudent from "../../components/ReusableTable/DeleteStudent";

import "./StudentList.css";
import { API_URL } from "../../config";

const ALL_STUDENTS = "/student";

const StudentList = () => {
  const navigate = useNavigate();

  const updateStudent = (path) => {
    navigate(path);
  };

  const [students, setStudents] = useState([]);

  const [render, setRender] = useState(false);

  /**Search States */
  const [filterState, setFilterState] = useState({
    filteredData: [],
    search: "",
  });

  /**Pagination States */
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(5);

  //get Current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPostsData = filterState.filteredData?.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const headers = [
    {
      display: "Image",
      key: "image",
    },
    {
      display: "First Name",
      key: "first_name",
    },
    {
      display: "Last Name",
      key: "last_name",
    },
    {
      display: "Date Of Birth",
      key: "date_of_birth",
    },
    {
      display: "Is Active",
      key: "is_active",
    },
    {
      display: "",
      key: "",
    },
  ];

  function buildStudentsDataRow() {
    return (
      currentPostsData &&
      currentPostsData.map((val) => {
        let post = { ...val };
        post[""] = "";

        const IS_ACTIVE = val.is_active === 1;
        const fullName = val.first_name + " " + val.last_name;

        post.image = (
          <img src={`${API_URL}/storage/${val.image}`} alt="error image" />
        );

        post.is_active = (
          <div className="icon-container">
            <img
              src={IS_ACTIVE ? active : notActive}
              alt={IS_ACTIVE ? "active-icon" : "not active"}
            />
            <span className="active">
              {IS_ACTIVE ? "active" : "not active"}
            </span>
          </div>
        );

        post[""] = (
          <div className="container-cell">
            <img
              src={editIcon}
              alt="edit-icon"
              className="icons-cursor"
              onClick={() => {
                updateStudent(`/update-student/${val.id}`);
              }}
            />
            <DeleteStudent
              deleteIcon={deleteIcon}
              alt={"delete-icon"}
              studentId={val.id}
              render={render}
              setRender={setRender}
              fullName={fullName}
            />
          </div>
        );

        return post;
      })
    );
  }

  const getAllStudents = getAllDataStudents({
    pathname: ALL_STUDENTS,
    setState: setStudents,
  });

  useEffect(() => {
    let isMounted = true;
    //AbortController cancel request if component unmount
    const controller = new AbortController();
    isMounted && getAllStudents();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [render]);

  useEffect(() => {
    let isMounted = true;
    isMounted &&
      setFilterState({
        ...filterState,
        filteredData: students.filter(
          (student) =>
            student.first_name
              .toLowerCase()
              .includes(filterState.search.toLowerCase()) ||
            student.last_name
              .toLowerCase()
              .includes(filterState.search.toLowerCase())
        ),
      });

    return () => {
      isMounted = false;
    };
  }, [students, filterState.search]);

  const createStudent = (path) => {
    navigate(path);
  };

  //Change Page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container className="mt-5">
      <h2>Students List</h2>
      <div className="student">
        <Form.Group className="mb-4" controlId="formBasicText">
          <Form.Control
            type="text"
            placeholder="Search Student"
            autoComplete="off"
            autoFocus
            value={filterState.search}
            onChange={(e) => {
              setFilterState({ search: e.target.value });
              setCurrentPage(1);
            }}
          />
        </Form.Group>
        <Button
          variant="default"
          className="bgColor textColor mb-4"
          onClick={() => {
            createStudent("/create-student");
          }}
        >
          Create Student
        </Button>
      </div>

      <ReusableTable
        allData={buildStudentsDataRow()}
        headers={headers}
        errorMessage={"No Students to display"}
      />

      <div className="student">
        {filterState.filteredData?.length !== 0 && (
          <CustomPagination
            postsPerPage={postsPerPage}
            totalPosts={students.length}
            currentPage={currentPage}
            paginate={paginate}
          />
        )}
        <p>
          <span className="go-back-link">
            <Link to="/department">Go To Departments Page{" > "}</Link>
          </span>
        </p>
      </div>
    </Container>
  );
};

export default StudentList;
