// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddInventory from "./pages/AddInventory";
import ManageItems from "./pages/ManageItems";
import ProcessOrder from "./pages/ProcessOrder";
import OrderHistory from "./pages/OrderHistory";

const App = () => {
  return (
    <Router>
      <Main />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        progress={undefined}
        theme="colored"
      />
    </Router>
  );
};

const Main = () => {
  const location = useLocation();

  return (
    <div className="app-layout">
      <Sidebar currentPath={location.pathname} />
      <div className="content-area">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addInventory" element={<AddInventory />} />
          <Route path="/manageItems" element={<ManageItems />} />
          <Route path="/processOrder" element={<ProcessOrder />} />
          <Route path="/orderHistory" element={<OrderHistory />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
