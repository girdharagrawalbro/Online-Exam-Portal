import React, { useContext, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "./components/Sidebar";
import UserBox from "./components/UserBox";
import UserContext from "../context/users/userContext"; 
const Users = () => {
  const { allusers, getallUser } = useContext(UserContext);

  useEffect(() => {
    getallUser();
  }, []);

  return (
    <>
      <Header headtext="Users" admin="logout" />
      <div className="d-flex">
        <div>
          <Sidebar />
        </div>
        <div className="main">
          <div className="container p-4">
            <div>
              <h3 className="text-start">Users List</h3>
            </div>
            <div className="my-3 mb-5 list-group row gap-2 w-100">
              {allusers.map((user) => (
                <UserBox key={user._id} user={user} /> // Corrected prop name to 'user'
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
