/* eslint-disable react/prop-types */

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = ({ username, logout, dashboard }) => {
  const [user, setUser] = useState("")
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUser(user)
  },[])

  const handleLogout = async() => {
    const response = await axios.post("http://localhost:3000/dealsdray/logout", {
      email : user.email
    })
    console.log(response)
    if (response) {
      toast.success(response.data.message)
      navigate("/dealsdray/login")
    }
  }


  const navigate = useNavigate();
  return (
    <div className="d-flex header">
      <div className="left">
        <h2 className="logo">DealsDray</h2>
      </div>
      <div className="right ">
        {dashboard ? (
          <div
            onClick={() => navigate("/dealsdray/dashboard")}
            className="btn logout">
            DashBoard
          </div>
        ) : (
          <></>
        )}
        {username && username ? (
          <div
            onClick={() => navigate("/dealsdray/employee-list")}
            className="btn list">
            Employee List
          </div>
        ) : (
          <></>
        )}
        {logout ? <div onClick={()=>handleLogout()} className="btn logout">{username} - Logout</div> : <></>}
      </div>
    </div>
  );
};

export default Header;
