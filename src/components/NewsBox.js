import React from "react";
import axios from "axios";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 7) {
    return `${diffDays} days ago`;
  } else {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }
};

const NewsBox = ({ news, admin, onDelete, onEdit }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`https://onlineexam-rcrg.onrender.com/api/news/${news._id}`);
      onDelete(news._id);
    } catch (error) {
      console.error("Error deleting news:", error);
    }
  };

  return (
    <div className="list-group-item list-group-item-action container-fluid">
      <div className="d-flex w-100 justify-content-between">
        <h6 className="mb-1">{news.title}</h6>
        <small>{formatDate(news.date)}</small> {/* Use formatted date here */}
      </div>
      <div className="d-flex w-100 justify-content-between my-1">
        <p className="mb-1 text-start">{news.description}</p>
        <div>
          {admin && (
            <>
              <button className="btn btn-outline-primary btn-sm me-2" onClick={() => onEdit(news)}>
                Edit
              </button>
              <button className="btn btn-outline-danger btn-sm" onClick={handleDelete}>
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsBox;
