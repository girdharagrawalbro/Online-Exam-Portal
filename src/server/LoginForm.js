import React, { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const LoginForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === props.adminUsername && password === props.adminPassword) {
      // Redirect to admin dashboard or perform other actions
      navigate('/admin/dashboard');  // Example of redirecting to the admin dashboard
      localStorage.setItem('token', 'admin')
    } else {
      console.error("Invalid admin credentials");
      // Display an error message to the user
      alert("Invalid admin credentials");
    }
  };

  return (
    <>
      <Header headtext="Admin Login" admin="true" />
      <div className="container mt-5 pt-5">
        <form onSubmit={handleSubmit} className="container-sm mt-5" style={{ width: '400px' }}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Admin ID
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
        <div className="container-xl my-5 text-light">
          <p>
            This is the admin login page where admins can log in and manage the server
            of the online exam portal.
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
