/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Header from "./Header";
import AddEmployee1 from "./AddEmployee1";
import { Chartdata } from "./Chartdata";
import { toast } from "react-toastify";
import axios from "axios";

const Dashboard = () => {
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);
  const [user, setUser] = useState({ username: "" });
  const [rolesData, setRolesData] = useState({ manager: 0, sales: 0, hr: 0 });


  function updateUser() {
    const userObj = JSON.parse(localStorage.getItem("user"));
    setUser(userObj);
  }
  // funtion to get employee designation data
  function updateRoles(data) {
    let manager = 0;
    let sales = 0;
    let hr = 0;
    if (data.length > 0) {
      manager = data.filter((employee) => {
        return employee.designation === "MANAGER";
      });
      sales = data.filter((employee) => {
        return employee.designation === "SALES";
      });
      hr = data.filter((employee) => {
        return employee.designation === "HR";
      });
    }
    setRolesData({ manager: manager.length, sales: sales.length, hr: hr.length });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://dealsdraybe-1.onrender.com/dealsdray/get-employee-list"
        );
        setTimeout(() => {
          updateRoles(response.data.data);
        }, 1500);
      } catch (error) {
        setTimeout(() => {
          toast.error(error.message);
        }, 1500);
      }
    };

    // fetch and update employee data
    fetchData();
    updateUser();
  }, []);

  return (
    <>
      <Header username={user.username.toUpperCase()} logout={true} />
      <div className="dashboard">
        {showEmployeeForm ? (
          <AddEmployee1
            showEmployeeForm={showEmployeeForm}
            setShowEmployeeForm={setShowEmployeeForm}
            type="Create"
          />
        ) : (
          <></>
        )}
        <button
          onClick={() => setShowEmployeeForm(!showEmployeeForm)}
          className="btn add-employee-btn">
          Add Employee
        </button>
        <h1>Welcome {user.username.toUpperCase()}</h1>
        <Chartdata
          manager={rolesData.manager}
          sales={rolesData.sales}
          hr={rolesData.hr}
        />
      </div>
    </>
  );
};

export default Dashboard;
