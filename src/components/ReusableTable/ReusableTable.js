import React from "react";
import { Table } from "react-bootstrap";

import "./ReusableTable.css";

const ReusableTable = (props) => {
  const { allData, headers , errorMessage } = props;
  return (
    <div className="table-outer">
      <Table striped bordered hover>
        <thead>
          <tr>
            {headers.map((head, key) => (
              <th key={key}>{head.display}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {allData?.length ? (
            allData?.map((data, dataIndex) => {
              return (
                <tr key={dataIndex}>
                  {headers.map((header, headerIndex) => {
                    return (
                      <td key={headerIndex}>
                        <span>{data[header.key]}</span>
                      </td>
                    );
                  })}
                </tr>
              );
            })
          ) : (
            <p className="errorMessage">{errorMessage}</p>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default ReusableTable;
