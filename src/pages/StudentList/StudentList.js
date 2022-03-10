import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";

import axios from "../../api/axios";
import ReusableTable from "../../components/ReusableTable/ReusableTable";

import "./StudentList.css";
import CustomPagination from "../../components/Pagination/CustomPagination";

const ALL_STUDENTS = "/student";

const StudentList = () => {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);

  /**Search States */
  const [filterState, setFilterState] = useState({
    filteredData: [],
    search: ""
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

  //get all Students
  const getAllStudents = async () => {
    try {
      await axios.get(ALL_STUDENTS).then((response) => {
        setStudents(response.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let isMounted = true;
    //AbortController cancel request if component unmount
    const controller = new AbortController();
    isMounted && getAllStudents();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

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
        )
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

  const headers = [
    "Profile",
    "First Name",
    "Last Name",
    "Date Of Birth",
    "Classes",
    "Active",
    ""
  ];

  return (
    <Container className="mt-5">
      <h2>Students List</h2>
      <div className="student-search-create">
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
        // allStudents={students}
        // allStudents={filterState.filteredData}
        allStudents={currentPostsData}
        headers={headers}
      />

      {filterState.filteredData?.length !== 0 && (
        <CustomPagination
          postsPerPage={postsPerPage}
          totalPosts={students.length}
          currentPage={currentPage}
          paginate={paginate}
        />
      )}
    </Container>
  );
};

export default StudentList;
