import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const UserResult = () => {
  const navigate = useNavigate();
  const { userId, examId } = useParams();
  const location = useLocation();
  const [data, setData] = useState(null);
  // Retrieve state passed from navigation
  const { examData, userData } = location.state || {};

  useEffect(() => {
      const fetchExamResult = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/exams/userexams/${userId}/${examId}`);
          const data = await response.json();
          setData(data)
        } catch (error) {
          console.error('Error fetching exam result:', error);
        }
      };     
      fetchExamResult();
  }, []);
console.log(examData)
  if (!userData || !examData ||!data) {
    return <h2 clssName="text-white mt-5">Loading...</h2>;
  }


  return (
    <>
      <header className="d-flex text-bg-dark px-3 py-2 align-items-center justify-content-between">
        <div className="text-start">
          <h5 className="text-secondary">Exam Results</h5>
          <h3 className="text-light">{userData.name} - {examData.title}</h3>
        </div>

        <div className="d-flex align-items-center gap-4 text-light">
          <div className="d-flex align-items-center gap-2 text-sm">
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
              className="h-4 w-4"
            >
              <path d="M8 2v4"></path>
              <path d="M16 2v4"></path>
              <rect width="18" height="18" x="3" y="4" rx="2"></rect>
              <path d="M3 10h18"></path>
            </svg>
            <span className="">{new Date(examData.date).toDateString()}</span>
          </div>
          <div>
            <button className="btn btn-outline-danger btn-sm" onClick={() => navigate('/')}>Exit</button>
          </div>
        </div>
      </header>

      <main className="d-flex m-5 p-5 text-light mx-auto w-100 justify-content-center">
        <div>
          <div className="d-flex gap-5 mb-5">
            <div>
            <h2>{examData.questions.length}</h2>
              <h5>Total Questions</h5>
            </div>
            <div>
              <h2 className="text-success">{data.correctAnswers}</h2>
              <h5>Correct Answers</h5>
            </div>
            <div>
              <h2 className="text-danger">{data.incorrectAnswers}</h2>
              <h5>Incorrect Answers</h5>
            </div>
          </div>
          <div className="d-flex gap-2 align-items-center justify-content-center">
            <h1>{data.percentage}%</h1>
            <h6>Correct Answers</h6>
          </div>
        </div>
      </main>
    </>
  );
};

export default UserResult;
