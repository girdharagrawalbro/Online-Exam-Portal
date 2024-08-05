import React, { useState, useEffect } from "react";
import ExamContext from "./examContext";

const ExamState = (props) => {
  const host = "http://localhost:5000";
  const [error, setError] = useState(null);

  // State hooks for exams and applications
  const [exams, setExams] = useState([]);
  const [upcomingExams, setUpcomingExams] = useState([]);
  const [ongoingExams, setOngoingExams] = useState([]);
  const [applicationExams, setApplicationExams] = useState([]);
  const [completedExams, setCompletedExams] = useState([]);
  const [news, setNews] = useState([]);
  const [applications, setApplications] = useState([]);

  const fetchExams = async (status = "") => {
    try {
      // API Call to get Exams based on status
      const url = status ? `${host}/api/exams?status=${status}` : `${host}/api/exams/`;
      const response = await fetch(url, {
        method: "GET",
      });
      const json = await response.json();
      if (status === "upcoming") {
        setUpcomingExams(json);
      } else if (status === "ongoing") {
        setOngoingExams(json);
      } else if (status === "completed") {
        setCompletedExams(json);
      } else if (status === "application-process") {
        setApplicationExams(json);
      } else {
        setExams(json);
      }
    } catch (error) {
      console.error("Failed to fetch exams", error);
    }
  };

  const fetchNews = async () => {
    try {
      // API Call to get all News
      const response = await fetch(`${host}/api/news/`, {
        method: "GET",
      });
      const json = await response.json();
      setNews(json);
    } catch (error) {
      console.error("Failed to fetch news", error);
    }
  };

  const fetchAllApplications = async () => {
    try {
      const response = await fetch(`${host}/api/exams/applications`, {
        method: "GET",
      });
      const json = await response.json();
      setApplications(json);
    } catch (error) {
      console.error("Failed to fetch all applications", error);
    }
  };

  const updateApplicationStatus = async (applicationId, status) => {
    try {
      const response = await fetch(`${host}/api/exams/applications/${applicationId}/${status}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
      if (response.ok) {
        // Update the application status in the local state
        setApplications((prevApplications) =>
          prevApplications.map((application) =>
            application._id === applicationId ? { ...application, status } : application
          )
        );
      } else {
        console.error("Failed to update application status");
      }
    } catch (error) {
      console.error("Failed to update application status", error);
    }
  };

  
  return (
    <ExamContext.Provider
      value={{
        exams,
        fetchExams,
        upcomingExams,
        ongoingExams,
        completedExams,
        applicationExams,
        news,
        fetchNews,
        applications,
        fetchAllApplications,
        updateApplicationStatus,
        setUpcomingExams,
        error,
  
      }}
    >
      {props.children}
    </ExamContext.Provider>
  );
};

export default ExamState;
