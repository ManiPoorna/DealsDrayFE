/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { LinearProgress, TextField, Box } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import Header from "./Header";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  async function createUser() {
    setLoader(true);
    if (
      user.username == "" ||
      user.email == "" ||
      user.password == "" ||
      user.confirm_password == ""
    ) {
      toast.error("Please enter all fields");
      setLoader(false);
      return;
    }
    if (user.password !== user.confirm_password) {
      setTimeout(() => {
        toast.error("Password not Matched");
        setLoader(false);
      }, 1500);
      return;
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3000/dealsdray/signup",
          user
        );
        if (parseInt(response.data.status) != 201) {
          setTimeout(() => {
            toast.error(response.data.message);
            setLoader(false);
          }, 1500);
        } else {
          setTimeout(() => {
            toast.success(response.data.message);
            setLoader(false);
            localStorage.setItem("user",JSON.stringify(user))
            navigate("/dealsdray/login");
          }, 1500);
        }
      } catch (error) {
        setTimeout(() => {
          setLoader(false);
          toast.error(error.message);
        }, 1500);
      }
    }
  }

  return (
    <>
      <Header username="" logout={false} />
      <div className="signup">
        <h2>
          Signup to <span>DealsDray</span>
        </h2>
        <TextField
          label={"User Name"}
          id="outlined-size-small"
          size="small"
          type="text"
          onChange={(e) =>
            setUser({ ...user, username: e.target.value.trim() })
          }
        />
        <TextField
          label={"Email"}
          id="outlined-size-small"
          size="small"
          type="email"
          onChange={(e) => setUser({ ...user, email: e.target.value.trim() })}
        />
        <TextField
          label={"Password"}
          id="outlined-size-small"
          size="small"
          type="password"
          onChange={(e) =>
            setUser({ ...user, password: e.target.value.trim() })
          }
        />
        <TextField
          label={"Confirm Password"}
          id="outlined-size-small"
          size="small"
          type="password"
          onChange={(e) =>
            setUser({ ...user, confirm_password: e.target.value.trim() })
          }
        />
        {loader ? (
          <Box sx={{ width: "100%", height: "20px" }}>
            <LinearProgress />
          </Box>
        ) : (
          <button onClick={() => createUser()} className="btn signup-btn">
            Signup
          </button>
        )}
        Already have an account? <br />
        <button
          onClick={() => navigate("/dealsdray/login")}
          className="btn signup-btn">
          Login
        </button>
        <p></p>
      </div>
    </>
  );
}

export default Signup;
