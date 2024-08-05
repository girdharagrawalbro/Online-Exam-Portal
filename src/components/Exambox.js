import React, { useEffect, useState } from "react";
import AlertMessage from "./AlertMessage";
import { useNavigate } from "react-router-dom";

const ExamBox = ({ exam, onDelete, onEdit, onApply, edit, apply, application, status, userAppliedExams, showStartButton, onAddQuestions, onShowQuestions, ongoing, user }) => {
  const navigate = useNavigate();
  const [examStatus, setExamStatus] = useState(status);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const currentDate = new Date();
    const applicationEndDate = new Date(exam.applicationEndDate);
    const oneDayAfterEndDate = new Date(applicationEndDate);
    oneDayAfterEndDate.setDate(applicationEndDate.getDate() + 1);

    if (currentDate >= oneDayAfterEndDate) {
      setExamStatus("upcoming");
    }
  }, [exam.applicationEndDate]);

  if (!exam) {
    return <div>Loading...</div>;
  }

  const handleDelete = () => {
    onDelete(exam._id);
  };

  const handleEdit = () => {
    onEdit(exam);
  };

  const handleAddQuestions = () => {
    onAddQuestions(exam._id)
  }
  const handleShowQuestions = () => {
    onShowQuestions(exam._id)
  }
  const handleApply = () => {
    const currentDate = new Date();
    const applicationStartDate = new Date(exam.applicationStartDate);
    const applicationEndDate = new Date(exam.applicationEndDate);

    if (currentDate >= applicationStartDate && currentDate <= applicationEndDate) {
      onApply(exam);
    } else {
      setShowAlert(true);
    }
  };
  const handleStartExam = () => {
    navigate(`/adminstartexam/${exam.title}`);
    localStorage.setItem('exam', exam._id);

  };

  const handleUserStartExam = () =>{
    navigate(`/startexam/${exam.title}`);
    localStorage.setItem('exam', exam._id);
    localStorage.setItem('user', user._id);

  }
  const isApplied = userAppliedExams && userAppliedExams.includes(exam._id);
  const currentDate = new Date();
  const applicationEndDate = new Date(exam.applicationEndDate);
  const applicationEnded = currentDate > applicationEndDate;

  return (
    <div className="card mb-3">
      <div className="card-body">

        <h5 className="card-title">{exam.title}</h5>
        <p className="card-text">{exam.description}</p>
        <p className="card-text">Exam Date: {new Date(exam.date).toDateString()}</p>
        <p className="card-text">Exam Time: {exam.time}</p>
        {ongoing ? (
          <button className="btn btn-primary" onClick={handleUserStartExam}>Join</button>
        ) : ""
        }
        {applicationEnded ? (
          ongoing ? "" :
          <p className="card-text text-danger">Application Ended</p>
        ) : (
          <>
            <p className="card-text">Application Start Date: {new Date(exam.applicationStartDate).toLocaleDateString()}</p>
            <p className="card-text">Application End Date: {new Date(exam.applicationEndDate).toLocaleDateString()}</p>
          </>
        )}
        {showAlert && (
          <AlertMessage message="The application period for this exam is currently closed." type="warning" />
        )}
        {showStartButton && (
          <button className="btn btn-primary" onClick={handleStartExam}>Start</button>
        )}
        {edit === "true" && (
          <div className="d-flex justify-content-between">
            <div>
              <button className="btn btn-outline-primary btn-sm me-2" onClick={handleAddQuestions}>
                Add Quesitons
              </button>
            </div>
            <div>
              <button className="btn btn-outline-dark btn-sm me-2" onClick={handleShowQuestions}>
                Show Quesitons
              </button>
            </div>
            <div className="d-flex">
              <button className="btn btn-outline-primary btn-sm me-2" onClick={handleEdit}>
                Edit
              </button>
              <button className="btn btn-outline-danger btn-sm" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        )}
        {apply === "true" && !applicationEnded && (
          <div className="d-flex justify-content-end">
            {isApplied ? (
              <span className="btn btn-outline-secondary btn-sm me-2">
                Applied
              </span>
            ) : (
              <button className="btn btn-outline-success btn-sm me-2" onClick={handleApply}>
                Apply
              </button>
            )}
          </div>
        )}
        {application === "true" && (
          <div className="d-flex justify-content-end">
            <span className="btn btn-warning">{status}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamBox;
