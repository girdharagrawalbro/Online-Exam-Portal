import React, { useContext } from "react";
import Header from "../components/Header";
import Sidebar from "./components/Sidebar";
import UserBox from "./components/UserBox";
import UserContext from "../context/users/userContext"; // Adjust the path if necessary

const Airlist = () => {
  const { users } = useContext(UserContext); 
  return (
    <>
      <Header headtext="Air list" admin="logout" />
      <div className="d-flex">
        <div>
          <Sidebar />
        </div>
        <div className="main">
          <div className="container p-4">
            <div className="d-flex justify-content-between">
              <div>
                <h3 className="text-start">Top Rankers</h3>
              </div>
              <div>
                <select class="form-select" aria-label="Default select example">
                  <option selected>- Select Exam -</option>
                  {/* show dunamically the exambox whose result are declared  */}
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </div>
            <div className="mt-3 list-group row gap-2 w-100">
            {users.map((exam) => (
              <UserBox key={exam._id} exam={exam} />
            ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Airlist;
