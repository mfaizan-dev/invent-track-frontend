import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = ({ currentPath }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = localStorage.getItem("logged_in");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("logged_in");
    if (!isLoggedIn && location.pathname !== "/register") {
      navigate("/");
    } else if (isLoggedIn && location.pathname === "/") {
      navigate("/dashboard");
    } else if (isLoggedIn && location.pathname === "/logout") {
      localStorage.clear();
      navigate("/");
    }
  }, [navigate, location.pathname]);

  return (
    <div className="sidebar">
      <h2>
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          Invent<span style={{ color: "#ff325f" }}>Track</span>
        </Link>
      </h2>
      <ul>
        <li>
          <Link
            to="/dashboard"
            className={location.pathname === "/dashboard" ? "active" : ""}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/addInventory"
            className={location.pathname === "/addInventory" ? "active" : ""}
          >
            Add Inventory
          </Link>
        </li>
        <li>
          <Link
            to="/manageItems"
            className={location.pathname === "/manageItems" ? "active" : ""}
          >
            Manage Items
          </Link>
        </li>
        <li>
          <Link
            to="/processOrder"
            className={location.pathname === "/processOrder" ? "active" : ""}
          >
            Process Order
          </Link>
        </li>
        <li>
          <Link
            to="/orderHistory"
            className={location.pathname === "/orderHistory" ? "active" : ""}
          >
            Order History
          </Link>
        </li>

        {isLoggedIn && (
          <li style={{ position: "absolute", bottom: "1rem", width: "85%" }}>
            <Link to="/logout">Logout</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
