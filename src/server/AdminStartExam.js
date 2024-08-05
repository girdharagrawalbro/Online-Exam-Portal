import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminStartExam = () => {
    const examId = localStorage.getItem('exam');
    const navigate = useNavigate();

    const [examData, setExamData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [examStarted, setExamStarted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(null);

    useEffect(() => {
        if (!examId) return;

        const fetchExamData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/exams/${examId}`);
                setExamData(response.data);
                const now = new Date();
                const examDate = new Date(response.data.date + 'T' + response.data.time);

                if (now >= examDate) {
                    setExamStarted(true);
                } else {
                    setExamStarted(false);
                    setTimeLeft(getTimeDifference(now, examDate));
                }
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchExamData();
    }, [examId]);

    useEffect(() => {
        let timer;
        if (!examStarted && timeLeft) {
            timer = setInterval(() => {
                const now = new Date();
                const examDate = new Date(examData.date + 'T' + examData.time);
                if (now < examDate) {
                    setTimeLeft(getTimeDifference(now, examDate));
                } else {
                    setExamStarted(true);
                    setTimeLeft(null);
                    clearInterval(timer);
                }
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [examStarted, timeLeft, examData]);

    const getTimeDifference = (currentTime, targetTime) => {
        const difference = targetTime - currentTime;
        if (difference <= 0) return null;

        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        return { hours, minutes, seconds };
    };

    const handleStartExam = () => {
        const now = new Date();
        const examDate = new Date(examData.date + 'T' + examData.time);

        if (now >= examDate) {
            setExamStarted(true);
        } else {
            alert("The exam has not started yet.");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading exam data.</p>;

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
                    <h3>{examData?.usersEnrolled?.length || 0} Users Enrolled</h3>
                    {!examStarted && timeLeft && (
                        <div>
                            <h3>Exam starts in:</h3>
                            <h4>{timeLeft.hours} hours {timeLeft.minutes} minutes {timeLeft.seconds} seconds</h4>
                        </div>
                    )}
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
}

export default AdminStartExam;
