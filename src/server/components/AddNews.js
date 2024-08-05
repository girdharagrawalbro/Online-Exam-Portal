import React, { useState } from "react";
import axios from "axios";

const AddNews = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: new Date().toISOString().slice(0, 10), // Current date in YYYY-MM-DD format
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/news/addnews", formData);
      onAdd(response.data); // Pass the new news to the parent component
    } catch (error) {
      console.error("Error adding news:", error);
    }
  };

  return (
    <>
      <div className="overlay" onClick={onClose}></div>
      <form className="add-exam-form text-dark" onSubmit={handleSubmit}>
        <h3 className="text-center">Add News</h3>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            News Title
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
            News Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            value={formData.description}
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

export default AddNews;
