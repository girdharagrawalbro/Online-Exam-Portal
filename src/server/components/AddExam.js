import React, { useState } from "react";
import axios from "axios";

const AddExam = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://onlineexam-rcrg.onrender.com/api/exams", formData);
      onAdd(); // Refresh the exams list
      onClose(); // Close the form after successful submission
    } catch (error) {
      console.error("Error adding exam:", error);
    }
  };

  return (
    <>
      <div className="overlay" onClick={onClose}></div>
      <form className="add-exam-form text-dark" onSubmit={handleSubmit}>
        <h3 className="text-center">Add Exam</h3>
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
          Add
        </button>
      </form>
    </>
  );
};

export default AddExam;
