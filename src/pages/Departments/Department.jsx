import React, { useEffect, useState, useContext } from "react";
import { Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { getAllDeparments } from "../../api/apis";

import Tree from "../../components/Department/DepartmentTree/Tree";
import Loading from "../../components/Loading/Loading";
import Loadingcontext from "../../context/LoadingProvider";

import "./Department.css";

const ALL_DEPARTMENTS = "/department";

const Department = () => {
  const navigate = useNavigate();
  const [treeData, setTreeData] = useState([]);
  const [loading, setLoading] = useContext(Loadingcontext);
  const [render, setRender] = useState(false);

  const getAllDepartments = getAllDeparments({
    pathName: ALL_DEPARTMENTS,
    setState: setTreeData,
    setLoading: setLoading
  });

  useEffect(() => {
    let isMounted = true;
    //AbortController cancel request if component unmount
    const controller = new AbortController();
    isMounted && getAllDepartments();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [render]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Container className="mt-5">
      <div className="tree-header-container">
        <h1>Tree of Departments</h1>
        <Button
          variant="default"
          className="textColor bgColor departments-button"
          type="submit"
          onClick={() => navigate("/create-parent-department")}
        >
          Create New Department
        </Button>
      </div>
      {treeData?.length > 0 ? (
        <Tree data={treeData} setRender={setRender} render={render} />
      ) : (
        <h1 className="errorMessage">No Result Found!</h1>
      )}
      <p>
        <span className="go-back-link">
          <Link to="/student">{" < "} Go Back To Students Page</Link>
        </span>
      </p>
    </Container>
  );
};

export default Department;
