import React, { useState } from "react";
import axios from "axios";

const EditExam = ({ exam, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: exam.title,
    description: exam.description,
    date: exam.date,
    time: exam.time,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://onlineexam-rcrg.onrender.com/api/exams/${exam._id}`, formData);
      onSave(response.data); // Update the exam list
      onClose(); // Close the form after successful submission
    } catch (error) {
      console.error("Error updating exam:", error);
    }
  };

  return (
    <>
      <div className="overlay" onClick={onClose}></div>
      <form className="edit-exam-form text-dark" onSubmit={handleSubmit}>
        <h3 className="text-center">Edit Exam</h3>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Exam Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Exam Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Exam Date
          </label>
          <input
            type="date"
            className="form-control"
            id="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="time" className="form-label">
            Exam Time
          </label>
          <input
            type="time"
            className="form-control"
            id="time"
            value={formData.time}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </>
  );
};

export default EditExam;
