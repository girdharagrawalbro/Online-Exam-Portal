import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// components import 
import RegistratonForm from "./components/RegistrationForm";
import UserPanel from "./user/UserPanel";
import Home from "./components/Home";
import Footer from "./components/Footer";
import UserStartExam from  "./user/UserStartExam"


// server components
import AdminPanel from "./server/AdminPanel";
import News from "./server/News";
import Exams from "./server/Exams";
import Users from "./server/Users";
import Results from "./server/Results";
import AIRList from "./server/Airlist";
import AdminLogin from "./server/LoginForm";
import Applications from "./server/Applications"
import AdminStartExam from "./server/AdminStartExam"



// context state import
import UserState from "./context/users/UserState";
import ExamState from "./context/exams/ExamState";

function App() {
  const adminUsername = process.env.REACT_APP_ADMIN_USERNAME;
  const adminPassword = process.env.REACT_APP_ADMIN_PASSWORD;
  return (
    <>
      <UserState>
        <ExamState>
          <Router>
            <div className="App">
              <Routes>
                {/* main section (without login) */}
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<RegistratonForm />} />
                <Route path="/user/:authtoken" element={<UserPanel />} />
                <Route path="/startexam/:examId" element={<UserStartExam />} />


                {/* admin section */}

                <Route
                  path="/admin"
                  element={
                    <AdminLogin
                      adminUsername={adminUsername}
                      adminPassword={adminPassword}
                    />
                  }
                />
                <Route path="/admin/dashboard" element={<AdminPanel />} />
                <Route path="/admin/news" element={<News />} />
                <Route path="/admin/exams" element={<Exams />} />
                <Route path="/admin/results" element={<Results />} />
                <Route path="/admin/applications" element={<Applications />} />
                <Route path="/admin/users" element={<Users />} />
                <Route path="/admin/airList" element={<AIRList />} />
                <Route path="/adminstartexam/:examid" element={<AdminStartExam />} />


              </Routes>
            </div>
            <Footer />
          </Router>
        </ExamState>
      </UserState>
    </>
  );
}

export default App;
