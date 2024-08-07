import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";

const RegistrationForm = () => {
  const [credentials, setCredentials] = useState({
    fullName: "",
    email: "",
    password: "",
    dob: "",
    confirmPassword: "",
    address: "",
    mobileNumber: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isTermsAccepted, setIsTermsAccepted] = useState(false); // State for checkbox

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage("");
  
    let hasError = false;
    const newErrors = {};
  
    if (!credentials.fullName) {
      newErrors.fullName = "Full name is required.";
      hasError = true;
    }
    if (!credentials.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.email)) {
      newErrors.email = "Please enter a valid email address.";
      hasError = true;
    }
    if (!credentials.password) {
      newErrors.password = "Password is required.";
      hasError = true;
    } else if (credentials.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
      hasError = true;
    }
    if (!credentials.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required.";
      hasError = true;
    } else if (credentials.confirmPassword !== credentials.password) {
      newErrors.confirmPassword = "Passwords do not match.";
      hasError = true;
    }
    if (!credentials.dob) {
      newErrors.dob = "Date of birth is required.";
      hasError = true;
    }
    if (!credentials.address) {
      newErrors.address = "Address is required.";
      hasError = true;
    }
    if (!credentials.mobileNumber) {
      newErrors.mobileNumber = "Mobile number is required.";
      hasError = true;
    }
    if (!isTermsAccepted) {
      newErrors.terms = "You must accept the terms and conditions.";
      hasError = true;
    }
  
    if (hasError) {
      setErrors(newErrors);
      return;
    }
  
    try {
      const response = await fetch("https://onlineexam-rcrg.onrender.com/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.fullName,
          email: credentials.email,
          dob: credentials.dob,
          password: credentials.password,
          address: credentials.address,
          mobileNumber: credentials.mobileNumber,
        }),
      });
  
      const json = await response.json();
      // console.log("Server Response:", json); // Log the server response
  
      if (json.success) {
        localStorage.setItem("token", json.authtoken);
        setSuccessMessage("Registration successful! Redirecting");
        setTimeout(() => navigate(`/user/${json.authtoken}`), 2000);
      } else {
        const serverErrors = {};
        if (json.errors) {
          json.errors.forEach((error) => {
            serverErrors[error.path] = error.msg;
          });
        }
        setErrors({ ...serverErrors, serverError: json.error || "Registration failed." });
      }
    } catch (error) {
      console.error("Registration failed:", error);
      setErrors({ serverError: "Registration failed." });
    }
  };
  
  

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Header headtext="Register" admin="false" />
      <main className="container-fluid p-5 mt-5">
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="d-flex registration-form">
            <div className="container">
              <div className="mb-3">
                <label htmlFor="fullName" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={credentials.fullName}
                  onChange={onChange}
                  name="fullName"
                  className="form-control"
                  aria-invalid={errors.fullName ? "true" : "false"}
                />
                {errors.fullName && (
                  <div className="text-danger">{errors.fullName}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  value={credentials.email}
                  onChange={onChange}
                  name="email"
                  className="form-control"
                  aria-describedby="emailHelp"
                  aria-invalid={errors.email ? "true" : "false"}
                />
                <div id="emailHelp" className="form-text">
                  We'll never share your email with anyone else.
                </div>
                {errors.email && (
                  <div className="text-danger">{errors.email}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="dob" className="form-label">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dob"
                  value={credentials.dob}
                  onChange={onChange}
                  name="dob"
                  className="form-control"
                  aria-invalid={errors.dob ? "true" : "false"}
                />
                {errors.dob && (
                  <div className="text-danger">{errors.dob}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={credentials.password}
                  onChange={onChange}
                  name="password"
                  className="form-control"
                  aria-invalid={errors.password ? "true" : "false"}
                />
                {errors.password && (
                  <div className="text-danger">{errors.password}</div>
                )}
              </div>
            </div>
            <div className="container">
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={credentials.confirmPassword}
                  onChange={onChange}
                  name="confirmPassword"
                  className="form-control"
                  aria-invalid={errors.confirmPassword ? "true" : "false"}
                />
                {errors.confirmPassword && (
                  <div className="text-danger">{errors.confirmPassword}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="mobileNumber" className="form-label">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  id="mobileNumber"
                  value={credentials.mobileNumber}
                  onChange={onChange}
                  name="mobileNumber"
                  className="form-control"
                  aria-invalid={errors.mobileNumber ? "true" : "false"}
                />
                {errors.mobileNumber && (
                  <div className="text-danger">{errors.mobileNumber}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <textarea
                  id="address"
                  value={credentials.address}
                  onChange={onChange}
                  name="address"
                  className="form-control"
                  aria-invalid={errors.address ? "true" : "false"}
                />
                {errors.address && (
                  <div className="text-danger">{errors.address}</div>
                )}
              </div>
            </div>
          </div>
          {errors.serverError && (
            <div className="alert alert-danger py-1 px-2">
              {errors.serverError}
            </div>
          )}
          {successMessage && (
            <div className="alert alert-success py-1 px-2">
              {successMessage}
            </div>
          )}
          <div className="d-flex justify-content-between flex-wrap">
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="termsCheck"
                checked={isTermsAccepted}
                onChange={(e) => setIsTermsAccepted(e.target.checked)} // Handle checkbox change
              />
              <label className="form-check-label" htmlFor="termsCheck">
                I agree to the terms and conditions
              </label>
              {errors.terms && (
                <div className="text-danger">{errors.terms}</div>
              )}
            </div>
            <div className="d-flex gap-3 align-items-center">
              <Link to="/" className="btn btn-primary">
                Login
              </Link>
              <button type="submit" className="btn btn-primary">
                Register to Online Exam Portal
              </button>
            </div>
          </div>
        </form>
      </main>
    </>
  );
  
};

export default RegistrationForm;
