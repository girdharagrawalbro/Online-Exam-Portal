import React, { useState } from "react";
import axios from "axios";

const EditNews = ({ news, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: news.title,
    description: news.description,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/news/${news._id}`, formData);
      onSave(response.data); // Pass the updated news to the parent component
    } catch (error) {
      console.error("Error updating news:", error);
    }
  };

  return (
    <>
      <div className="overlay" onClick={onClose}></div>
      <form className="edit-news-form text-dark" onSubmit={handleSubmit}>
        <h3 className="text-center">Edit News</h3>
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
          Update
        </button>
      </form>
    </>
  );
};

export default EditNews;
