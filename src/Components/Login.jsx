/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { LinearProgress, TextField,Box } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import Header from "./Header";
import axios from "axios";


function Login() {
  const navigate = useNavigate();

  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);

  async function loginUser() {
    setLoader(true);
    if (!loginId || !password) {
      toast.error("Please enter all fields");
      setLoader(false);
      return;
    }
    try {
      const response = await axios.post(
        "http://dealsdraybe-1.onrender.com/dealsdray/login",
        { loginId: loginId, password: password }
      )
      if (parseInt(response.data.status) != 200) {
        setTimeout(() => {
          toast.error(response.data.message);
          setLoader(false);
        }, 1500);
      } else {
        setTimeout(() => {
          toast.success(response.data.message);
          localStorage.setItem('user', JSON.stringify(response.data.data))
          setLoader(false);
          navigate("/dealsdray/dashboard");
        }, 1500);
      }
    } catch (error) {
      setTimeout(() => {
        setLoader(false);
        toast.error(error.message);
      }, 1500);
    }
  }

  return (
    <>
      <Header username="" logout={false} />
      <div className="signup">
        <h2>
          Login to <span>DealsDray</span>
        </h2>
        <TextField
          label={"Email"}
          id="outlined-size-small"
          size="small"
          type="email"
          onChange={(e) => setLoginId(e.target.value.trim())}
        />
        <TextField
          label={"Password"}
          id="outlined-size-small"
          size="small"
          type="password"
          onChange={(e) => setPassword(e.target.value.trim())}
        />
        {loader ? (
          <Box sx={{ width: "100%", height: "20px" }}>
            <LinearProgress />
          </Box>
        ) : (
          <button onClick={() => loginUser()} className="btn signup-btn">
            Login
          </button>
        )}
        Dont have an account? <br />
        <button
          onClick={() => navigate("/dealsdray/signup")}
          className="btn signup-btn">
          Signup
        </button>
        <p></p>
      </div>
    </>
  );
}

export default Login;
