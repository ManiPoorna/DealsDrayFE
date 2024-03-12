/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";

const Header = ({ username, logout, dashboard }) => {
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
        {logout ? <div onClick={()=>navigate("/dealsdray/login")} className="btn logout">{username} - Logout</div> : <></>}
      </div>
    </div>
  );
};

export default Header;
