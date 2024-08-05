import React from 'react';
import ExamBox from "../Exambox";

export const Apply = ({ onClose }) => {
  return (
    <>
      <div className="overlay" onClick={onClose}></div>
      <div className='popups container-sm bg-light rounded p-2'>
        <h3>Apply Exam Links </h3>
        <div className='row md-3'>
          <ExamBox />
          <ExamBox />
          <ExamBox />
        </div>
      </div>
    </>
  );
}

export default Apply;
