import React from "react";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

export default function Header({ headtext, admin }) {
  return (
    <nav className="navbar bg-body-tertiary bg-dark" data-bs-theme="dark">
      <div className="container-fluid d-flex">
        <span className="navbar-brand mb-0 h1">Online Exam - {headtext}</span>

        {!localStorage.getItem("token") ? (
          admin === "true" ? (
            <Link to="/" className="btn btn-sm btn-primary">
              Home
            </Link>
          ) : (
            <Link to="/admin" className="btn btn-sm btn-primary">
              Admin Login
            </Link>
          )
        ) : (
          <LogoutButton />
        )}
      </div>
    </nav>
  );
}
