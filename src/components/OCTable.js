import React, { useEffect, useMemo, useState } from "react";

async function fetchCovidData() {
  const url =
    "https://storage.googleapis.com/covid19-open-data/v3/location/US_CA_06059.json";
  try {
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    return new Promise.reject(error);
  }
}

export default function OCTable() {
  const [covidData, setCovidData] = useState([]);
  const columns = useMemo(
    () => [
      { Header: "Date", accessor: 1 },
      { Header: "Cases", accessor: 16 },
      { Header: "New", accessor: 14 },
      { Header: "Deaths", accessor: 17 },
      { Header: "New", accessor: 15 },
      { Header: "Vaccinated", accessor: 19 },
      { Header: "Population", accessor: 20 },
    ],
    []
  );

  useEffect(() => {
    let ignore = false;
    fetchCovidData().then((data) => {
      if (!ignore) {
        setCovidData(data.data);
      }
    });
    return () => {
      ignore = true;
    };
  }, []);

  return (
      <div><h1 className="title">Orange County COVID-19 Data</h1>
      <div className="table-container">
        <div className="table-wrapper">
          <div className="table">
          <table className="custom-table">
            <thead>
              <tr>
                {columns.map((column, idx) => (
                  <th key={column.Header + idx}>{column.Header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {covidData.map((row) => (
                <tr key={Math.random()}>
                  {columns.map((column, idx) => (
                    <td key={column.accessor + idx}>
                      {row[column.accessor] || 0}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            </table>
            </div>
        </div>
      </div>
    </div>
  );
}
