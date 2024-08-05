import React, { useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import Sidebar from "./components/Sidebar";
import ExamContext from "../context/exams/examContext";

const Results = () => {

  const {results, upcomingExams, applicationExams, fetchExams }= useContext(ExamContext);
  const [filteredResults, setFilteredResults] = useState([]);
  const [selectedExam, setSelectedExam] = useState("");

  useEffect(() => {
    fetchExams("application-process");
    fetchExams("upcoming")
  }, []);
  useEffect(() => {
    if (selectedExam) {
      setFilteredResults(results.filter((app) => app.exam._id === selectedExam));
    } else {
      setFilteredResults(results);
    }
  }, [selectedExam, results]);

  const handleExamChange = (e) => {
    setSelectedExam(e.target.value);
  };
  return (
    <>
      <Header headtext="Results" admin="logout" />
      <div className="d-flex">
        <div>
          <Sidebar />
        </div>
        <div className="main">
          <div className="container p-4">
            <div className="d-flex justify-content-between">
              <div>
                <h3 className="text-start">Results</h3>
              </div>
              <div>
                <select className="form-select" aria-label="Default select example">
                <option value="">All Exams</option>
                  {[...applicationExams, ...upcomingExams].map((exam) => (
                    <option key={exam._id} value={exam._id}>{exam.title}</option>
                  ))}</select>
              </div>
            </div>
            {/* <div> */}
            {/* {filteredResults.map((application) => (
                  // <ApplicationBox
                  //   key={application._id}
                  //   application={application}
                  //   onAccept={handleAccept}
                  //   onReject={handleReject}
                  // />
                ))}
            // </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Results;
