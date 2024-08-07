import React, { useEffect, useState } from "react";
import AlertMessage from "./AlertMessage";
import { useNavigate } from "react-router-dom";

const ExamBox = ({
  exam,
  onDelete,
  onEdit,
  onApply,
  edit,
  apply,
  applications,
  application,
  status,
  showStartButton,
  onAddQuestions,
  onShowQuestions,
  ongoing,
  user,
  userExams,
  userData,
}) => {
  const navigate = useNavigate();
  const [examStatus, setExamStatus] = useState(status);
  const [showAlert, setShowAlert] = useState(false);
  const [isApplied, setIsApplied] = useState(false); // State to track if the user has applied

  useEffect(() => {
    // Check if the user has already applied for the exam
    const applied = applications?.some((application) => application.exam._id === exam._id);
    setIsApplied(applied);
  }, [applications, exam._id]);

  useEffect(() => {
    const currentDate = new Date();
    const applicationEndDate = new Date(exam.applicationEndDate);
    const oneDayAfterEndDate = new Date(applicationEndDate);
    oneDayAfterEndDate.setDate(applicationEndDate.getDate() + 1);

    if (currentDate >= oneDayAfterEndDate) {
      setExamStatus("upcoming");
    }
  }, [exam.applicationEndDate]);

  const handleDelete = () => onDelete(exam._id);
  const handleEdit = () => onEdit(exam);
  const handleAddQuestions = () => onAddQuestions(exam._id);
  const handleShowQuestions = () => onShowQuestions(exam._id);
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
    localStorage.setItem("exam", exam._id);
  };

  const handleUserStartExam = () => {
    navigate(`/startexam/${exam.title}`);
    localStorage.setItem("exam", exam._id);
    localStorage.setItem("user", user._id);
  };

  const handleResult = () => {
    navigate(`/results/${userData._id}/${exam._id}`, {
      state: { examData: exam, userData },
    });
  };

  if (!exam) return <div>Loading...</div>;

  const currentDate = new Date();
  const applicationStartDate = new Date(exam.applicationStartDate);
  const applicationEndDate = new Date(exam.applicationEndDate);
  const applicationActive = currentDate >= applicationStartDate && currentDate <= applicationEndDate;
  
  const isExamCompleted = userExams?.some(
    (userExam) => userExam.examId === exam._id && userExam.isSubmitted
  ) || false;
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{exam.title}</h5>
        <p className="card-text">{exam.description}</p>
        <p className="card-text">Exam Date: {new Date(exam.date).toDateString()}</p>
        <p className="card-text">Exam Time: {exam.time}</p>

        {user && (
          ongoing && !isExamCompleted ? (
            <button className="btn btn-primary" onClick={handleUserStartExam}>
              Start Exam
            </button>
          ) : (
            
            <button className="btn btn-secondary" disabled>
              Exam Completed
            </button>
          )
        )}

        {isExamCompleted && (
          <button className="btn btn-success m-2" onClick={handleResult}>
            View Results
          </button>
        )}

        {applicationActive ? (
          <>
            <p className="card-text">
              Application Start Date: {applicationStartDate.toDateString()}
            </p>
            <p className="card-text">
              Application End Date: {applicationEndDate.toDateString()}
            </p>
            <div className="d-flex justify-content-end">
              {edit==="false" ? "" : (application==="true" ? "" : isApplied ? (
                <button className="btn btn-outline-secondary btn-sm" disabled>
                  Applied
                </button>
              ) : (
                <button className="btn btn-outline-success btn-sm" onClick={handleApply}>
                  Apply
                </button>
              ))}
            </div>
          </>
        ) : (
          !ongoing && <p className="card-text text-danger">Application Ended</p>
        )}

        {showAlert && (
          <AlertMessage
            message="The application period for this exam is currently closed."
            type="warning"
          />
        )}

        {showStartButton && (
          <button className="btn btn-primary" onClick={handleStartExam}>
            Start
          </button>
        )}

        {edit === "true" && (
          <div className="d-flex justify-content-between">
            <button
              className="btn btn-outline-primary btn-sm me-2"
              onClick={handleAddQuestions}
            >
              Add Questions
            </button>
            <button
              className="btn btn-outline-dark btn-sm me-2"
              onClick={handleShowQuestions}
            >
              Show Questions
            </button>
            <button
              className="btn btn-outline-primary btn-sm me-2"
              onClick={handleEdit}
            >
              Edit
            </button>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        )}
{isExamCompleted ? "" : application === "true" && (
          <div className="d-flex justify-content-end">
            <span className="btn btn-warning">{status}</span>
          </div>
        )}

      </div>
    </div>
  );
};

export default ExamBox;
