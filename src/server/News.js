import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Header from "../components/Header";
import Sidebar from "./components/Sidebar";
import NewsBox from "../components/NewsBox";
import EditNews from "./components/EditNews";
import AddNews from "./components/AddNews";
import ExamContext from "../context/exams/examContext";

const News = () => {
  const { news, fetchNews } = useContext(ExamContext);
  const [newsItems, setNewsItems] = useState([]);
  const [editingNews, setEditingNews] = useState(null);
  const [showAddNews, setShowAddNews] = useState(false);

  useEffect(() => {
    fetchNews()
  }, []);

  useEffect(() => {
    setNewsItems(news);
  }, [news]);

  const handleAddNewsClick = () => {
    setShowAddNews(true);
  };

  const handleClose = () => {
    setShowAddNews(false);
    setEditingNews(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/news/${id}`);
      setNewsItems(newsItems.filter((news) => news._id !== id));
    } catch (error) {
      console.error("Error deleting news:", error);
    }
  };

  const handleEdit = (news) => {
    setEditingNews(news);
  };

  const handleUpdate = (updatedNews) => {
    setNewsItems(newsItems.map((news) => (news._id === updatedNews._id ? updatedNews : news)));
    setEditingNews(null);
  };

  const handleAdd = (newNews) => {
    setNewsItems([...newsItems, newNews]);
    setShowAddNews(false);
  };

  return (
    <>
      <Header headtext="News" admin="logout" />
      <div className="d-flex">
        <Sidebar />
        <div className="main">
          <div className="container p-4">
            <div className="d-flex justify-content-between">
              <h3 className="text-start">News</h3>
              <button onClick={handleAddNewsClick} className="btn btn-primary">
                Add News
              </button>
            </div>

            <div className="mt-3 list-group row gap-2 w-100">
              {showAddNews && <AddNews onClose={handleClose} onAdd={handleAdd} />}
              {editingNews && (
                <EditNews news={editingNews} onClose={handleClose} onSave={handleUpdate} />
              )}
              <div className="list-group">
                {newsItems.map((news) => (
                  <NewsBox
                    key={news._id}
                    news={news}
                    admin={true}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                    className="w-100"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default News;
