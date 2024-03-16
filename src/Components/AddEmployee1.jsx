/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  TextField,
  Box,
  LinearProgress,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
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
  });

  const [courses, setCourses] = useState([]);
  const [image, setImage] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]);

  function updateCourse(e) {
    const courseValue = e.target.value;
    const isChecked = e.target.checked;
    if (isChecked) {
      if (!courses.includes(courseValue))
        setCourses([...courses, e.target.value]);
    } else {
      let courseArr = courses.filter((course) => {
        return course !== e.target.value;
      });
      setCourses(courseArr);
    }
  }

  async function createEmployee(type, email) {
    setLoader(true);
    if (
      !employee.name ||
      !employee.email ||
      !employee.mobile ||
      !employee.designation ||
      !employee.gender ||
      courses.length === 0
    ) {
      setTimeout(() => {
        toast.error("Please fill all Credentials");
        setLoader(false);
      }, 1500);
      return;
    }

    

    if (type === "Create") {
      let employeeData = {
        name: employee.name,
        email: employee.email,
        mobile: employee.mobile,
        designation: employee.designation,
        gender: employee.gender,
        course: courses,
        image: image,
      };
      const response = await axios.post(
        "http://localhost:3000/dealsdray/create-employee",
        employeeData
      );
      // console.log(response.data);
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
    } else if (type === "Edit") {
      let employeeData = {
        name: employee.name,
        email: employee.email,
        mobile: employee.mobile,
        designation: employee.designation,
        gender: employee.gender,
        course: courses,
        image: image,
      };

      const response = await axios.post(
        `http://localhost:3000/dealsdray/update-employee?email=${email}`,
        employeeData,
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

  const updateEmployee = (e) => {
    // console.log(e.target.name)
    if (e.target.name === "name") {
      setEmployee({ ...employee, name: e.target.value });
    } else if (e.target.name === "email") {
      setEmployee({ ...employee, email: e.target.value });
    } else if (e.target.name === "mobile") {
      setEmployee({ ...employee, mobile: e.target.value });
    }
  };

  const handleGenderChange = (e) => {
    setEmployee({ ...employee, gender: e.target.value });
  };

  useEffect(() => {
    if (employeeObj) {
      setEmployee(employeeObj);
      setCourses(employeeObj.course);
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
  }


  const updateImage = async(type) => {
    const formData = new FormData();
    formData.append("image", image);
    if (type === "Create") {
      try {
        const response = await axios.post(
          "http://localhost:3000/dealsdray/upload-image",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3000/dealsdray/edit-uploaded-image",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  }
  useEffect(() => {
    updateImage(type);
  },[image])

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
            name="name"
            value={employee.name}
            onChange={(e) => updateEmployee(e)}
          />
          <TextField
            label={"Employee Email"}
            id="outlined-size-small"
            size="small"
            type="email"
            name="email"
            value={employee.email}
            onChange={(e) =>
              setEmployee({ ...employee, email: e.target.value.trim() })
            }
          />
          <TextField
            label={"Employee Mobile Number"}
            id="outlined-size-small"
            size="small"
            type="text"
            name="mobile"
            value={employee.mobile}
            onChange={(e) =>
              setEmployee({ ...employee, mobile: e.target.value })
            }
          />
          <select
            name="select"
            id="select"
            onChange={(e) =>
              setEmployee({ ...employee, designation: e.target.value })
            }>
            <option value="Designation" selected>
              {employee.designation ? employee.designation : "Designation"}
            </option>
            <option value="HR">HR</option>
            <option value="MANAGER">MANAGER</option>
            <option value="SALES">SALES</option>
          </select>
          <div className="gender">
            <input
              type="radio"
              checked={employee.gender === "MALE"}
              onChange={handleGenderChange}
              name="gender"
              value="MALE"
            />{" "}
            MALE
            <span> </span>
            <input
              type="radio"
              checked={employee.gender === "FEMALE"}
              onChange={handleGenderChange}
              name="gender"
              value="FEMALE"
            />{" "}
            FEMALE
          </div>

          <div className="checkbox">
            <div>
              <label htmlFor="">BSC : </label>
              <input
                type="checkbox"
                value="BSC"
                checked={courses.includes("BSC")}
                onChange={(e) => updateCourse(e)}
              />
            </div>
            <div>
              <label htmlFor="">MCA : </label>
              <input
                type="checkbox"
                value="MCA"
                checked={courses.includes("MCA")}
                onChange={(e) => updateCourse(e)}
              />
            </div>
            <div>
              <label htmlFor="">BCA : </label>
              <input
                type="checkbox"
                value="BCA"
                // checked
                checked={courses.includes("BCA")}
                onChange={(e) => updateCourse(e)}
              />
            </div>
          </div>
          <TextField
            type="file"
            accept="image/jpeg"
            label="Employee Image"
            variant="outlined"
            name="image"
            onChange={(e)=>setImage(e.target.files[0])}
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
            onClick={() =>
              createEmployee(
                type,
                employeeObj != undefined ? employeeObj.email : ""
              )
            }
            className="btn">
            {type} Employee
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
