import React, { useContext, useEffect } from "react";
import ExamBox from "../../components/Exambox";
import ExamContext from "../../context/exams/examContext"; // Adjust the path if necessary

export default function Main() {
  const { ongoingExams, upcomingExams, completedExams, fetchExams } = useContext(ExamContext);

  useEffect(() => {
    fetchExams()
    fetchExams("upcoming")
    fetchExams("completed")
    fetchExams("ongoing")
    fetchExams("application-process")
  }, []);


  const isStartButtonVisible = (exam) => {
    const now = new Date();
    const examDate = new Date(exam.date); // Assuming `startDate` is a Date string
    if(examDate.toDateString() === now.toDateString())
    {
        return true;
    }
  };

  return (
    <div className="container p-4">
      <div className="w-100">
        <div>
          <div>
            <h3 className="text-start">Ongoing Exam</h3>
          </div>
          <div className="d-flex gap-4 flex-wrap">
            {ongoingExams && ongoingExams.length > 0 ? (
              ongoingExams.map((exam) => (
                <ExamBox key={exam._id} exam={exam} edit="false" />
              ))
            ) : (
              <div className="text-warning text-center">Nothing to show</div>
            )}

          </div>
        </div>
        <div className="mt-3">
          <div>
            <h3 className="text-start">Upcoming Exam</h3>
          </div>
          <div className="d-flex gap-4 flex-wrap">
            {upcomingExams && upcomingExams.length > 0 ? (upcomingExams.map((exam) => (
              <ExamBox
                key={exam._id}
                exam={exam}
                edit="false"
                showStartButton={isStartButtonVisible(exam)}
              />
            ))) : (
              <div className="text-warning text-center">Nothing to show</div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-2">
        <h3 className="text-start">Recently Completed Exams</h3>
      </div>
      <div className="py-2 d-flex gap-4">
        {completedExams && completedExams.length > 0 ? (completedExams.map((exam) => (
          <ExamBox key={exam._id} exam={exam} edit="false" />
        ))) : (
          <div className="text-warning text-center">Nothing to show</div>
        )}
      </div>
    </div>
  );
}
