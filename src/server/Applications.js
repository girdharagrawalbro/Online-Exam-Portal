import React, { useContext, useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "./components/Sidebar"; // Corrected path
import ApplicationBox from "./components/ApplicationBox"; // Corrected path
import ExamContext from "../context/exams/examContext";

const Applications = () => {
  const { applications, upcomingExams, applicationExams, fetchExams, fetchAllApplications, updateApplicationStatus } = useContext(ExamContext);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [selectedExam, setSelectedExam] = useState("");

  useEffect(() => {
    fetchAllApplications();
    fetchExams("application-process");
    fetchExams("upcoming")
  }, []);

  useEffect(() => {
    if (selectedExam) {
      setFilteredApplications(applications.filter((app) => app.exam._id === selectedExam));
    } else {
      setFilteredApplications(applications);
    }
  }, [selectedExam, applications]);

  const handleExamChange = (e) => {
    setSelectedExam(e.target.value);
  };

  const handleAccept = (applicationId) => {
    updateApplicationStatus(applicationId, "accepted");
  };

  const handleReject = (applicationId) => {
    updateApplicationStatus(applicationId, "rejected");
  };

  return (
    <>
      <Header headtext="Applications" admin="logout" />
      <div className="d-flex">
        <Sidebar />
        <div className="main">
          <div className="container p-4">
            <div className="d-flex justify-content-between">
              <div>
                <h3 className="text-start">Applications</h3>
              </div>
              <div>
                <select className="form-select" aria-label="Default select example" onChange={handleExamChange}>
                  <option value="">All Exams</option>
                  {[...applicationExams, ...upcomingExams].map((exam) => (
                    <option key={exam._id} value={exam._id}>{exam.title}</option>
                  ))}

                </select>
              </div>
            </div>
            <div className="mt-3 list-group row gap-2 w-100">
              <div className="list-group">
                {filteredApplications.map((application) => (
                  <ApplicationBox
                    key={application._id}
                    application={application}
                    onAccept={handleAccept}
                    onReject={handleReject}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Applications;
