import React, { useContext,useEffect} from "react";
import NewsBox from "./NewsBox";
import ExamContext from "../context/exams/examContext";

const NewsSection = () => {
  const { news,fetchNews } = useContext(ExamContext);
  useEffect(() =>{
    fetchNews();
  },[]);
  if (!Array.isArray(news)) {
    // Show a loading spinner if `news` is not an array (likely still loading or an error occurred)
    return (
      <div className="container my-3 d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-3">
      <h2 className="text-light">Notice Board</h2>
      <div className="mt-3 list-group row gap-2 w-100 mx-auto">
        {news.map((newsItem) => (
          <NewsBox key={newsItem._id} news={newsItem} admin={false} />
        ))}
      </div>
    </div>
  );
};

export default NewsSection;
