import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserStartExam = () => {
  const examId = localStorage.getItem('exam');
  const userId = localStorage.getItem('user');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [examData, setExamData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    if (!examId) return;
    const fetchExamData = async () => {
      try {
        const examResponse = await axios.get(`http://localhost:5000/api/exams/${examId}`);
        setExamData(examResponse.data);
        setAnswers(new Array(examResponse.data.questions.length).fill(null));
        setLoading(false);
      } catch (err) {
        console.error('Error fetching exam data:', err);
        setError(err);
      }
    };

    fetchExamData();
  }, [examId]);

  useEffect(() => {
    if (!userId) return;

    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(`http://localhost:5000/api/auth/${userId}`);
        setUserData(userResponse.data); // Corrected here
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError(err);
      }
    };
    fetchUserData();
  }, [userId]);

  const handleAnswerChange = (questionIndex, optionIndex) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = optionIndex;
    setAnswers(updatedAnswers);
  };

  const handleSave = async () => {
    try {
      await axios.post(`http://localhost:5000/api/exams/${examId}/save`, { userId, answers });
      alert('Exam saved successfully');
    } catch (err) {
      console.error('Error saving exam:', err);
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`http://localhost:5000/api/exams/${examId}/submit`, { userId, answers });
      alert('Exam submitted successfully! Result will be declared Soon Redirecting');
      navigate('/results'); // Navigate to results page or a different route
    } catch (err) {
      console.error('Error submitting exam:', err);
    }
  };

  if (loading) return <h2 className='text-light mt-5'>Loading...</h2>;
  if (error) return <h2 className='text-warning mt-5'>Error: {error.message}</h2>;

  return (
    <>
      <div className="d-flex text-bg-dark px-3 py-2 align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-4">
          <div>
            <h4>{examData.title}</h4>
          </div>
          <div className="text-small text-white-50 text-start align-items-center">
            <div>Duration: 60 mins</div>
            <div>Questions: {examData.questions.length}</div>
          </div>
        </div>

        <div className="d-flex align-items-center gap-4">
          <h6 className="text-small text-white">
            {userData ? userData.name : 'Loading...'}
          </h6>
          <button onClick={() => navigate(-1)} className="btn btn-outline-light rounded-circle p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
            <span className="sr-only">Close</span>
          </button>
        </div>
      </div>

      <div className="flex-grow-1 bg-secondary-50 d-flex flex-wrap p-3 d-grid gap-3">
        {examData.questions.map((question, index) => (
          <div className="text-bg-dark text-start p-4 rounded shadow" key={index}>
            <div className="h5 font-weight-medium mb-3">{question.text}</div>
            <div className="d-grid gap-2">
              {question.options.map((option, optionIndex) => (
                <div className="form-check" key={optionIndex}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name={`question${index}`}
                    id={`option${index}-${optionIndex}`}
                    value={optionIndex}
                    checked={answers[index] === optionIndex}
                    onChange={() => handleAnswerChange(index, optionIndex)}
                  />
                  <label className="form-check-label" htmlFor={`option${index}-${optionIndex}`}>
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="fixed-bottom px-3 py-2 d-flex justify-content-end gap-2">
        <button className="btn btn-light" onClick={handleSave}>Save</button>
        <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
      </div>
    </>
  );
};

export default UserStartExam;
