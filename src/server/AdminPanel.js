import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import AlertMessage from "../components/AlertMessage"; // Assuming you have this component

const AdminPanel = () => {
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      setAlertMessage("You are not logged in. Redirecting to login page...");
      setTimeout(() => {
        navigate("/");
      }, 3000); // 3 seconds delay before redirect
    }
  }, [navigate]);


  return (
    <>
      {!localStorage.getItem("token") ? (
        <>
          {alertMessage && (
            <AlertMessage type="warning" message={alertMessage} />
          )}
        </>
      ) : (
        <>
          <Header headtext="Admin Panel" admin="true" />
          <div className="d-flex">
            <div>
              <Sidebar />
            </div>
            <div className="main">
              <Main />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AdminPanel;
