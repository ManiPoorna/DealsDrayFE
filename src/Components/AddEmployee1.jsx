/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  MenuItem,
  Select,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Box,
  LinearProgress,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddEmployee = ({
  showEmployeeForm,
  setShowEmployeeForm,
  type,
  employeeObj,
}) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: "",
  });

  async function createEmployee(type, email) {
    setLoader(true);
    if (
      !employee.name ||
      !employee.email ||
      !employee.mobile ||
      !employee.designation ||
      !employee.gender ||
      !employee.course
    ) {
      setTimeout(() => {
        toast.error("Please fill all Credentials");
        setLoader(false);
      }, 1500);
      return;
    }

     if (type === "Create") {
       const response = await axios.post(
         "http://dealsdraybe-1.onrender.com/dealsdray/create-employee",
         employee
       );
       if (response.data.status != 201) {
         setTimeout(() => {
           toast.error(response.data.message);
           setLoader(false);
         }, 1500);
       } else {
         setTimeout(() => {
           toast.success(response.data.message);
           setShowEmployeeForm(false);
           setEmployee({});
           setLoader(false);
         }, 1500);
       }
     } else if(type === "Edit"){
       const response = await axios.post(
         `http://dealsdraybe-1.onrender.com/dealsdray/update-employee?email=${email}`,
         employee
       );
       if (response.data.status != 201) {
         setTimeout(() => {
           toast.error(response.data.message);
           setLoader(false);
         }, 1500);
       } else {
         setTimeout(() => {
           toast.success(response.data.message);
           setShowEmployeeForm(false);
           setEmployee({});
           setLoader(false);
         }, 1500);
       }
     }
  }

  async function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="form-div">
      <div className="add-employee">
        <h1
          onClick={() => setShowEmployeeForm(!showEmployeeForm)}
          className="close">
          X
        </h1>
        <center>
          <h1>{type} Employee</h1>
          <br />
        </center>
        <div className="form">
          <TextField
            label={"Employee Name"}
            id="outlined-size-small"
            size="small"
            type="text"
            onChange={(e) =>
              setEmployee({ ...employee, name: e.target.value.trim() })
            }
          />
          <TextField
            label={"Employee Email"}
            id="outlined-size-small"
            size="small"
            type="email"
            onChange={(e) =>
              setEmployee({ ...employee, email: e.target.value.trim() })
            }
          />
          <TextField
            label={"Employee Mobile Number"}
            id="outlined-size-small"
            size="small"
            type="text"
            onChange={(e) =>
              setEmployee({ ...employee, mobile: e.target.value })
            }
          />
          <Select
            onChange={(e) =>
              setEmployee({
                ...employee,
                designation: e.target.value.trim().toUpperCase(),
              })
            }
            sx={{
              width: 250,
            }}>
            <MenuItem value="hr">HR</MenuItem>
            <MenuItem value="manager">Manager</MenuItem>
            <MenuItem value="sales">Sales</MenuItem>
          </Select>
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
              Employee Gender
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              onChange={(e) =>
                setEmployee({
                  ...employee,
                  gender: e.target.value.toUpperCase(),
                })
              }>
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
              Employee Course:
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              onChange={(e) =>
                setEmployee({
                  ...employee,
                  course: e.target.value.trim().toUpperCase(),
                })
              }>
              <FormControlLabel value="BSC" control={<Radio />} label="BSC" />
              <FormControlLabel value="MCA" control={<Radio />} label="MCA" />
              <FormControlLabel value="BCA" control={<Radio />} label="BCA" />
            </RadioGroup>
          </FormControl>
          <TextField
            type="file"
            accept="image/jpeg"
            label="Employee Image"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
          {loader ? (
            <Box sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>
          ) : (
            <></>
          )}
          <button
            onClick={() => createEmployee(type, employeeObj!=undefined ? employeeObj.email : "")}
            className="btn">
            {type} Employee
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
