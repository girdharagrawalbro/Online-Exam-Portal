import React, { useState } from 'react';
import LoginForm from "./LoginForm";
import Header from "./Header";
import Quicklinks from "./Quicklinks";
import NewsSection from "./NewsSection";

// popups 
import Apply from "./popups/Apply";
// import AdmitCard from "./popups/AdmitCard";
import Result from "./popups/Result";
// import AnswerKey from "./popups/AnswerKey";

function Home() {
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [isResultOpen, setIsResultOpen] = useState(false);

  const handleQuicklinkClick = (linkName) => {
    if (linkName === 'Apply') {
      setIsApplyOpen(true);
    }
    else if (linkName === 'Result'){
      setIsResultOpen(true);

    }
    // Handle other quick links if necessary
  };

  const handleCloseApply = () => {
    setIsApplyOpen(false);
  };
  const handleCloseResult = () => {
    setIsResultOpen(false);
  };

  return (
    <>
      <Header headtext="Exam Made Easy" />
      <br />
      <main className="container-fluid m-main p-2 mt-5">
        <div className="container-xxl d-flex justify-content-center gap-5 my-4 flex-wrap">
          <div className="detail-text-box mx-4 text-light">
            <h1 className="text-start">
              Welcome, <br />to Online Exam Portal
            </h1>
            <p className="text-start py-3">
              This portal offers a streamlined and efficient platform for
              conducting assessments and exams over the internet.
              The website typically features a user-friendly interface, enabling
              examinees to easily navigate through the exam process, from
              registration to completion. Robust security measures are implemented
              to prevent cheating, including features like secure browsers, webcam
              monitoring, and randomized question pools.
              Overall, an online exam website enhances accessibility, convenience,
              and fairness in the assessment process, making it an invaluable tool
              in modern education and professional certification.
            </p>
            <Quicklinks onQuicklinkClick={handleQuicklinkClick} />
          </div>
          <LoginForm />
        </div>
        <NewsSection />
        
        {isApplyOpen && <Apply onClose={handleCloseApply} />}
        {isResultOpen && <Result onClose={handleCloseResult} />}

      </main>
    </>
  );
}

export default Home;
