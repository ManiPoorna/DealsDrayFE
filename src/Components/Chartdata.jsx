/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

export const Chartdata = ({ manager, sales, hr }) => {
  
  const [noData,setNoData] = useState(false)
  const data = [
    ["Task", "Hours per Day"],
    ["Manager", manager],
    ["Sales", sales],
    ["HR", hr],
  ];
  const options = {
    title: "Types of Employees",
    is3D: true,
  };

  useEffect(() => {
    if (manager === 0 && sales === 0 && hr === 0) { 
      setNoData(false)
    }
    else {
      setNoData(true)
    }
  },[manager,sales,hr])


  return (
    <>
      {noData ? (
        <Chart
          chartType="PieChart"
          data={data}
          options={options}
          width={"100%"}
          height={"400px"}
        />
      ) : (
        <div className="no-data">
          <h1>Add Employees to get statistics.</h1>
        </div>
      )}
    </>
  );
};

