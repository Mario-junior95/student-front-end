import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./Tree.css";

const Tree = ({ data = [] }) => {
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

const TreeNode = ({ node, key }) => {
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
            //   onClick={()=>navigate('/department')}
          >
            Create Child
          </Button>
          <Button
            variant="default"
            className="textColor bgColor departments-button"
            type="submit"
            //   onClick={()=>navigate('/department')}
          >
            Update
          </Button>
          <Button
            variant="default"
            className="textColor bgColor"
            type="submit"
            //   onClick={()=>navigate('/department')}
          >
            Delete
          </Button>
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
