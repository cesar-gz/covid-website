import React, { useState, useEffect, useMemo } from "react";
import { useTable } from "react-table";
import axios from "axios";
import "./Table.css";

function Table() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://disease.sh/v3/covid-19/countries")

      .then((response) => {
        setData(response.data);
        // console.log(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Country",
        accessor: "country",
      },
      {
        Header: "Cases",
        accessor: "cases",
      },
      {
        Header: "Deaths",
        accessor: "deaths",
      },
      {
        Header: "Recovered",
        accessor: "recovered",
      },
      {
        Header: "Tests",
        accessor: "tests",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div>
      <h1>COVID-19 Data Worldwide</h1>
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
                      {row.cells.map((cell) => {
                        return (
                          <td {...cell.getCellProps()} key={cell.column.id}>
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
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

export default Table;
