import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { register } from "../utils/ApiService";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await register(
      formData.fullName,
      formData.username,
      formData.password
    );
    res?.success ? toast.success(res.message) : toast.error(res.message);
    if (res?.success) {
      navigate("/login");
    }
    setLoading(false);
  };

  return (
    <div className="user-directory">
      <h2>Register</h2>
      {loading && (
        <div className="overlay">
          <ClipLoader color="#ffffff" size={50} />
        </div>
      )}
      <form className="login" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group" style={{ marginTop: "1rem" }}>
          <label htmlFor="username">Username</label>
          <input
            type="email"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group" style={{ marginTop: "1rem" }}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            columnGap: 2,
          }}
        >
          <button
            type="button"
            className="reg-button"
            style={{ marginTop: "1rem", width: "100%" }}
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            type="submit"
            className="submit-button"
            style={{ marginTop: "1rem", width: "100%" }}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
