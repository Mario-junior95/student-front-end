import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import DeleteDepartment from "../DeleteDepartment/DeleteDepartment";
import "./Tree.css";

const Tree = (props) => {
  const { data = [] } = props;
  return (
    <div>
      <ul className="icons-cursor">
        {data.map((tree, key) => (
          <TreeNode node={tree} key={key} />
        ))}
      </ul>
    </div>
  );
};

const TreeNode = (props) => {
  const { node, key } = props;

  const navigate = useNavigate();
  const [childVisible, setChildVisiblity] = useState(false);

  const hasChild = node.childs ? true : false;

  return (
    <li className="department-list" key={key}>
      <div onClick={(e) => setChildVisiblity((v) => !v)}>
        <div className="col d-tree-head">
          <b className="parent-department">{node.name}</b>
          <p>
            <b>Slug:</b> {node.slug}
          </p>
          <p>
            <b>Description:</b> {node.description}
          </p>
          <Button
            variant="default"
            className="textColor bgColor departments-button"
            type="submit"
            onClick={() => navigate(`/create-child-department/${node.id}`)}
          >
            Create Child
          </Button>
          <Button
            variant="default"
            className="textColor bgColor departments-button"
            type="submit"
            onClick={() => navigate(`/update-child-department/${node.id}`)}
          >
            Update
          </Button>
          <DeleteDepartment childDepartmentId={node.id} />
        </div>
      </div>
      {hasChild && childVisible && (
        <div>
          <ul>
            <Tree data={node.childs} />
          </ul>
        </div>
      )}
    </li>
  );
};

export default Tree;
