/* eslint-disable no-unused-vars */
import { TextField } from "@mui/material";
import Header from "./Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "./Loader";
import AddEmployee1 from "./AddEmployee1";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const Employeelist1 = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [user, setUser] = useState({ username: "" });
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);
  const [employeeObj, setEmployeeObj] = useState({});

  // get loggedin user data
  function updateUser() {
    const userObj = JSON.parse(localStorage.getItem("user"));
    setUser(userObj);
  }

  useEffect(() => {
    setLoader(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://dealsdraybe-1.onrender.com/dealsdray/get-employee-list"
        );
        setTimeout(() => {
          setEmployeeList(response.data.data);
          setLoader(false);
        }, 1500);
      } catch (error) {
        setTimeout(() => {
          toast.error(error.message);
          setLoader(false);
        }, 1500);
      }
    };

    fetchData();
    updateUser();
  }, []);

  // function to editemployee
  function editEmployee(employee) {
    setShowEmployeeForm(!showEmployeeForm);
    setEmployeeObj(employee);
  }

  //function to delete employee
  async function deleteEmployee(email) {
    let confirmation = confirm("Are you sure you want to delete");
    if (confirmation) {
      try {
        const response = await axios.post(
          `http://dealsdraybe-1.onrender.com/dealsdray/delete-employee?email=${email}`
        );
        if (response.data.status !== 200) {
          setTimeout(() => {
            toast.success(response.data.message);
          }, 1500);
        } else {
          setTimeout(() => {
            toast.success(response.data.message, + "Please refresh the Page");
          }, 1500);
        }
      } catch (error) {
        setTimeout(() => {
          toast.error("Some Error Occured ",error.message);
        }, 1500);
      }
    }
  }

  return (
    <>
      <Header
        username={user.username.toUpperCase()}
        logout={true}
        dashboard={true}
      />
      <div className="employee-list-page">
        <h3>
          Search :{" "}
          <TextField id="outlined-size-small" size="small" type="text" />
        </h3>
        <table className="table">
          <tr>
            <th>S.No </th>
            <th>Name </th>
            <th>Photo </th>
            <th>Email </th>
            <th>Mobile </th>
            <th>Designation </th>
            <th>Gender </th>
            <th>Course </th>
            <th>Creation Date </th>
            <th>Edit/Delete</th>
          </tr>
          <tbody>
            {loader ? <Loader /> : <></>}
            {
              employeeList.length === 0 && !loader? <h1>No Employees </h1> : <></>
            }
            {employeeList &&
              employeeList.map((employee, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{employee.name}</td>
                  <td>Image</td>
                  <td>{employee.email}</td>
                  <td>{employee.mobile}</td>
                  <td>{employee.designation}</td>
                  <td>{employee.gender}</td>
                  <td>{employee.course}</td>
                  <td>{employee.date.substr(0, 10)}</td>
                  <td>
                    <button
                      onClick={() => editEmployee(employee)}
                      className="btn">
                      <EditIcon/>
                    </button>
                    <span> </span>
                    <button
                      onClick={() => deleteEmployee(employee.email)}
                      className="btn">
                      <DeleteForeverIcon/>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {showEmployeeForm ? (
        <AddEmployee1
          showEmployeeForm={showEmployeeForm}
          setShowEmployeeForm={setShowEmployeeForm}
          type="Edit"
          employeeObj={employeeObj}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default Employeelist1;
