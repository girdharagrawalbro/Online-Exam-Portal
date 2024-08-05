import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ExamContext from '../context/exams/examContext';

const AdminStartExam = () => {
  const { examStarted, setExamStarted, examData, setExamData } = useContext(ExamContext);

  const examId = localStorage.getItem('exam');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!examId) return;

    const fetchExamData = async () => {
      try {
        const examResponse = await axios.get(`https://onlineexam-rcrg.onrender.com/api/exams/${examId}`);
        setExamData(examResponse.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching exam data:", err);
        setError(err);
      }
    };

    fetchExamData();
  }, [examId, setExamData]);

  const handleStartExam = async () => {
    let currentTime = new Date();   
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let timeString = hours + ':' + minutes;

    const examTime = examData.time;

    if (timeString === examTime || timeString > examTime) {
      try {
        await axios.post(`https://onlineexam-rcrg.onrender.com/api/exams/start/${examId}`);
        setExamStarted(true);
      } catch (err) {
        console.error("Error starting exam:", err);
      }
    } else {
      alert("There is time left before the exam starts.");
    }
  };

  if (loading) return <h3 className="text-light mt-5">Loading...</h3>;
  if (error) return <h3 className="text-warning mt-5">Error loading exam data.</h3>;

  return (
    <div className="d-flex flex-column vh-100">
      <header className="bg-dark text-white p-2 d-flex align-items-center justify-content-between">
        <div className='d-flex gap-3 align-items-center'>
          <h4>{examData?.title || "Example heading"}</h4>
        </div>
        <div className='d-flex gap-3 align-items-center'>
          <button
            className="btn btn-outline-light btn-sm"
            onClick={() => navigate(-1)} // Navigate back to previous page
          >
            Close
          </button>
        </div>
      </header>
      <main className="flex-grow-1 d-flex flex-column align-items-center justify-content-center gap-4">
        <div className="display-1 fw-bold text-light">
          <h1>{examData?.description || "Exam Description"}</h1>
          <h3>{examData?.date ? new Date(examData.date).toLocaleDateString() : "Date not available"} - {examData?.time || "Time Not Available"}</h3>
        </div>
        {examStarted ? (
          <button
            className="btn btn-secondary btn-lg"
            onClick={() => alert("Exam is already started!")}
          >
            Exam Started
          </button>
        ) : (
          <button
            className="btn btn-primary btn-lg"
            onClick={handleStartExam}
          >
            Start Exam
          </button>
        )}
      </main>
    </div>
  );
};

export default AdminStartExam;
