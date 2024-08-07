// utility
import React, { useState, useContext, useEffect } from "react";

// components
import Header from "../components/Header";
import Sidebar from "./components/Sidebar";
import AddExam from "./components/AddExam";
import EditExam from "./components/EditExam";
import ExamBox from "../components/Exambox";
import AddQuestions from "./components/AddQuestions";
import ShowQuestions from "./components/ShowQuestions";

// context
import ExamContext from "../context/exams/examContext"; // Adjust the path if necessary
import axios from "axios";

const Exams = () => {
  const { exams, fetchExams } = useContext(ExamContext);
  const [showAddExam, setShowAddExam] = useState(false);
  const [editingExam, setEditingExam] = useState(null);
  const [addQuestions, setAddQuestions] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);


  useEffect(() => {
    fetchExams();
  }, []);

  const handleAddExamClick = () => {
    setShowAddExam(true);
  };

  const handleClose = () => {
    setShowAddExam(false);
    setEditingExam(null);
    setAddQuestions(null)
    setShowQuestions(null)

  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://onlineexam-rcrg.onrender.com/api/exams/${id}`);
      fetchExams(); // Refresh the exams list
    } catch (error) {
      console.error("Error deleting exam:", error);
    }
  };

  const handleEdit = (exam) => {
    setEditingExam(exam);
  };

  const handleAddQuestions = (examId) => {
    setAddQuestions(examId);
  };

  const handleShowQuestions = (examId) => {
    setShowQuestions(examId);
  };
  
  const handleExamUpdate = async (updatedExam) => {
    try {
      await axios.put(`https://onlineexam-rcrg.onrender.com/api/exams/${updatedExam._id}`, updatedExam);
      fetchExams(); // Refresh the exams list
      setEditingExam(null);
    } catch (error) {
      console.error("Error updating exam:", error);
    }
  };
  const handleQuestionUpdate = async (updatedQuestions) =>{

  }
  return (
    <>
      {showAddExam && <AddExam onClose={handleClose} onAdd={fetchExams} />}
      {editingExam && (
        <EditExam
          exam={editingExam}
          onClose={handleClose}
          onSave={handleExamUpdate}
        />
      )}
     {addQuestions && (
  <AddQuestions
    examId={addQuestions}
    onClose={handleClose}
    onSave={handleQuestionUpdate}
  />
)}
{showQuestions && (
  <ShowQuestions
    examId={showQuestions}
    onClose={handleClose}
    onSave={handleQuestionUpdate}
  />
)}
 <Header headtext="Exams" />
      <div className="d-flex">
        <Sidebar />
        <div className="main p-2">
          <div className="d-flex justify-content-between">
              <h3 className="text-start">Exams</h3>
              <button className="btn btn-primary btn-sm" onClick={handleAddExamClick}>
                Add Exam
              </button>
          </div>
          <div className="d-flex flex-wrap justify-content-around my-3 exam-list">
            {exams.map((exam) => (
              <ExamBox
                key={exam._id}
                exam={exam}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onAddQuestions={handleAddQuestions}
                onShowQuestions={handleShowQuestions}
                edit="true"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Exams;
