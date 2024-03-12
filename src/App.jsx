import { Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./Components/Dashboard";
import Employeelist1 from "./Components/Employeelist1";

const App = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/dealsdray/signup" element={<Signup />} />
        <Route path="/dealsdray/login" element={<Login />} />
        <Route path="/dealsdray/dashboard" element={<Dashboard />} />
        <Route path="/dealsdray/employee-list" element={<Employeelist1 />} />
      </Routes>
    </>
  );
};

export default App;
