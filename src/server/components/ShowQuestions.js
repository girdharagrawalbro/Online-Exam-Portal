import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShowQuestions = ({ onClose, onSave, examId }) => {
  const [questions, setQuestions] = useState([]);
  const [editingQuestionId, setEditingQuestionId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    text: '',
    options: ['', '', '', ''],
    correctAnswer: -1
  });

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`https://onlineexam-rcrg.onrender.com/api/exams/${examId}/questions`);
        setQuestions(response.data.questions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [examId]);

  const handleEditClick = (question) => {
    setEditingQuestionId(question._id);
    setEditFormData({
      text: question.text,
      options: question.options,
      correctAnswer: question.options.indexOf(question.correctAnswer)
    });
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith('option')) {
      const index = parseInt(name.split('-')[1], 10);
      const updatedOptions = [...editFormData.options];
      updatedOptions[index] = value;
      setEditFormData({ ...editFormData, options: updatedOptions });
    } else if (type === 'checkbox') {
      setEditFormData({ ...editFormData, correctAnswer: checked ? parseInt(value, 10) : -1 });
    } else {
      setEditFormData({ ...editFormData, [name]: value });
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (editFormData.correctAnswer === -1) {
      alert("Please select a correct answer.");
      return;
    }

    try {
      await axios.put(`https://onlineexam-rcrg.onrender.com/api/exams/${examId}/questions/${editingQuestionId}`, {
        text: editFormData.text,
        options: editFormData.options,
        correctAnswer: editFormData.options[editFormData.correctAnswer]
      });

      // Update the local questions state
      setQuestions((prevQuestions) =>
        prevQuestions.map((question) =>
          question._id === editingQuestionId
            ? { ...question, ...editFormData, correctAnswer: editFormData.options[editFormData.correctAnswer] }
            : question
        )
      );

      setEditingQuestionId(null);
      onSave(); // Refresh the exams list
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };
  const handleDelete = async (questionId) => {
    try {
      await axios.delete(`https://onlineexam-rcrg.onrender.com/api/exams/${examId}/questions/${questionId}`);
      setQuestions(questions.filter(question => question._id !== questionId)); // Update UI
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };
  return (
    <>
      <div className="overlay" onClick={onClose}></div>
      <div className="show-questions-box bg-white p-4 rounded">
        <div className="d-flex align-items-center justify-content-between">
          <h1 className="h3 fw-bold">Questions in this Exam</h1>
        </div>
        <div className="my-3 d-flex justify-content-between flex-wrap">
          {questions.map((question) => (
            <div key={question._id} className="mb-3 border px-2 pb-1">
              {editingQuestionId === question._id ? (
                <form onSubmit={handleEditSubmit}>
                  <div className="mb-3">
                    <label htmlFor="text" className="form-label">Question Text</label>
                    <input
                      type="text"
                      id="text"
                      name="text"
                      className="form-control"
                      value={editFormData.text}
                      onChange={handleEditChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Options</label>
                    {editFormData.options.map((option, index) => (
                      <div key={index} className="d-flex align-items-center mb-2">
                        <input
                          type="checkbox"
                          value={index}
                          checked={editFormData.correctAnswer === index}
                          onChange={handleEditChange}
                          className="me-2"
                        />
                        <input
                          type="text"
                          name={`option-${index}`}
                          className="form-control"
                          value={option}
                          onChange={handleEditChange}
                          required
                        />
                      </div>
                    ))}
                  </div>
                  <button type="submit" className="btn btn-sm btn-primary me-2">Save</button>
                  <button type="button" className="btn btn-sm btn-secondary" onClick={() => setEditingQuestionId(null)}>Cancel</button>
                </form>
              ) : (
                <>
                  <h5>{question.text}</h5>
                  <p>Options:</p>
                  <ul>
                    {question.options.map((option, index) => (
                      <li key={index} className={option === question.correctAnswer ? "text-success" : ""}>
                        {option} {option === question.correctAnswer && "(Correct)"}
                      </li>
                    ))}
                  </ul>

                  <div className='d-flex justify-content-center gap-2'>
                    <button type="button" className="btn btn-sm btn-primary" onClick={() => handleEditClick(question)}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(question._id)}>Delete</button>
                    </div>

                    </>
              )}
                  </div>
          ))}
                </div>
            </div>
    </>
        );
};

        export default ShowQuestions;
