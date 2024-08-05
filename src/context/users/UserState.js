import React, { useState, useEffect } from "react";
import UserContext from "./userContext";

const UserState = (props) => {
  const host = "http://localhost:5000";

  const [loading, setLoading] = useState(null); 

  const getallUser = async () => {
    try {
      // API Call to get all Exams
      const response = await fetch(`${host}/api/auth/users/`, {
        method: "GET",
      });
      const json = await response.json();
      setallUsers(json);
    } catch (error) {
      console.error("Failed to fetch exams", error);
    }
  };

  // State hook for exams
  const [allusers, setallUsers] = useState([]);


  return (
    <UserContext.Provider value={{ allusers, setallUsers,loading, setLoading, getallUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
