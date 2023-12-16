import React, { useState, useEffect, useMemo } from "react";
import { useTable } from "react-table";
import axios from "axios";
import "./Table.css";

function CovidDailyTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.covidtracking.com/v1/us/daily.json")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Positive",
        accessor: "positive",
      },
      {
        Header: "Negative",
        accessor: "negative",
      },
      {
        Header: "Deaths",
        accessor: "death",
      },
      {
        Header: "Total-Tests",
        accessor: "totalTestResults",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div>
      <h1 className="title">COVID-19 USA Daily Data</h1>
      <div className="table-container">
        <div className="table-wrapper">
          <div className="table">
            <table {...getTableProps()} className="custom-table">
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr
                    {...headerGroup.getHeaderGroupProps()}
                    key={headerGroup.id}
                  >
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()} key={column.id}>
                        {column.render("Header")}{" "}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()} key={row.id}>
                      {row.cells.map((cell) => (
                        <td {...cell.getCellProps()} key={cell.column.id}>
                          {cell.render("Cell")}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CovidDailyTable;
