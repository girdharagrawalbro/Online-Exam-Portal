import React from 'react'
import { Link } from "react-router-dom";


export default function Sidebar () {
  return (
    <>
    <div className="sidebar">
    <ul>
      <li>
        <Link to="/admin/dashboard">Home</Link>
      </li>
      <li>
        <Link to="/admin/news">News</Link>
      </li>
      <li>
        <Link to="/admin/exams">Exams</Link>
      </li>
      <li>
        <Link to="/admin/applications">Applications</Link>
      </li>
      <li>
        <Link to="/admin/results">Results</Link>
      </li>
      <li>
        <Link to="/admin/users">Users</Link>
      </li>
      </ul>
  </div>  
  </>
  );
}
