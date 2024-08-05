import React, { useState } from 'react';
import axios from 'axios';

const AddQuestions = ({ onClose, onSave, examId }) => {
  const [formData, setFormData] = useState({
    text: '',
    options: ['', '', '', ''],
    correctAnswer: -1 // Initialize with -1 to indicate no correct answer selected
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith('option')) {
      const index = parseInt(name.split('-')[1], 10);
      const updatedOptions = [...formData.options];
      updatedOptions[index] = value;
      setFormData({ ...formData, options: updatedOptions });
    } else if (type === 'checkbox') {
      setFormData({ ...formData, correctAnswer: checked ? parseInt(value, 10) : -1 });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.correctAnswer === -1) {
      alert("Please select a correct answer.");
      return;
    }

    try {
      await axios.post("https://onlineexam-rcrg.onrender.com/api/exams/addquestions", {
        examId,
        question: {
          text: formData.text,
          options: formData.options,
          correctAnswer: formData.options[formData.correctAnswer]
        }
      });
      onSave(); // Refresh the exams list
      
      setSuccessMessage('Question added successfully!');
      setTimeout(() => setSuccessMessage(''), 3000); // Hide the message after 3 seconds

      resetForm(); // Reset the form for the next question
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      text: '',
      options: ['', '', '', ''],
      correctAnswer: -1
    });
  };

  return (
    <>
      <div className="overlay" onClick={onClose}></div>
      <div className="add-questions-form bg-white p-4 rounded">
        <div className="d-flex align-items-center justify-content-between">
          <h1 className="h3 fw-bold">Add Questions to Exam</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="text" className="form-label">Question Text</label>
            <input
              type="text"
              id="text"
              name="text"
              className="form-control"
              value={formData.text}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Options</label>
            {formData.options.map((option, index) => (
              <div key={index} className="d-flex align-items-center mb-2">
                <input
                  type="checkbox"
                  value={index}
                  checked={formData.correctAnswer === index}
                  onChange={handleChange}
                  className="me-2"
                />
                <input
                  type="text"
                  name={`option-${index}`}
                  className="form-control"
                  value={option}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
          </div>
          <div className="d-flex align-items-center">
            <button type="submit" className="btn btn-primary me-2">Add Question</button>
            {successMessage && <span className="text-success">{successMessage}</span>}
          </div>
        </form>
      </div>
    </>
  );
};

export default AddQuestions;
