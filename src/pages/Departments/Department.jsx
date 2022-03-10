import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


import Tree from "../../components/DepartmentTree/Tree";
import axios from "../../api/axios";

import "./Department.css";

const ALL_DEPARTMENTS = "/department";

const Department = () => {
  const navigate = useNavigate();
  const [treeData, setTreeData] = useState([]);

  //get all Departments
  const getAllStudents = async () => {
    try {
      await axios.get(ALL_DEPARTMENTS).then((response) => {
        setTreeData(response.data.parents);
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

  return (
    <Container className="mt-5">
      <div className="tree-header-container">
        <h1>Tree of Departments</h1>
        <Button
          variant="default"
          className="textColor bgColor departments-button"
          type="submit"
            onClick={()=>navigate('/create-parent-department')}
        >
          Create New Department
        </Button>
      </div>
      <Tree data={treeData} />
    </Container>
  );
};

export default Department;
