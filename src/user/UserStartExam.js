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
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    if (!examId) return;
    const fetchExamData = async () => {
      try {
        const examResponse = await axios.get(`http://localhost:5000/api/exams/${examId}`);
        setExamData(examResponse.data);
        setAnswers(
          examResponse.data.questions.reduce((acc, question, index) => {
            acc[index] = null; // Default to no answer
            return acc;
          }, {})
        );
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
        setUserData(userResponse.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError(err);
      }
    };
    fetchUserData();
  }, [userId]);

  const handleAnswerChange = (questionIndex, option) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionIndex]: option
    }));
  };

  const handleSave = async () => {
    try {
      const formattedAnswers = Object.values(answers); // Convert object to array of answers
      await axios.post(`http://localhost:5000/api/exams/${examId}/save`, { userId, answers: formattedAnswers });
      alert('Exam saved successfully');
    } catch (err) {
      console.error('Error saving exam:', err);
    }
  };

  const handleSubmit = async () => {
    try {
      const formattedAnswers = Object.values(answers); // Convert object to array of answers
      await axios.post(`http://localhost:5000/api/exams/${examId}/submit`, { userId, answers: formattedAnswers });
      alert('Exam submitted successfully! Result will be declared soon. Redirecting...');
      navigate('/');
    } catch (err) {
      console.error('Error submitting exam:', err);
    }
  };

  if (loading) return <h2 className='text-light mt-5'>Loading...</h2>;
  if (error) return <h2 className='text-warning mt-5'>Error: {error.message}</h2>;

  return (
    <>
      <div className="d-flex text-bg-dark px-3 py-2 align-items-center justify-content-between flex-wrap">
        <div className="d-flex align-items-center gap-4 flex-wrap">
          <div>
            <h4>{examData.title}</h4>
          </div>
          <div className="text-small text-white-50 text-start hide align-items-center">
            <div>Duration: 60 mins</div>
            <div>Questions: {examData.questions.length}</div>
          </div>
        </div>

        <div className="d-flex align-items-center gap-4">
          <h6 className="text-small text-white">
            {userData ? userData.name : 'Loading...'}
          </h6>
          <button onClick={() => navigate(-1)} className="btn btn-sm btn-outline-danger">
            Close
          </button>
        </div>
      </div>

      <div className="flex-grow-1 bg-secondary-50 d-flex flex-wrap p-3 d-grid gap-3">
        {examData.questions.map((question, index) => (
          <div className="text-bg-dark text-start p-4 rounded shadow question-box" key={index}>
            <div className="h5 font-weight-medium mb-3">{question.text}</div>
            <div className="d-grid gap-2">
              {question.options.map((option, optionIndex) => (
                <div className="form-check" key={optionIndex}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name={`question${index}`}
                    id={`option${index}-${optionIndex}`}
                    value={option}
                    checked={answers[index] === option}
                    onChange={() => handleAnswerChange(index, option)}
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
