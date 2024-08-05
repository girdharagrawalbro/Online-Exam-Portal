import React from "react";

function Exambox() {
  return (
    <div className="card my-3">
      <div className="p-3">
        <h5 className="">
          Multi-Tasking (Non-Technical) Staff and Havldar (CBIC & CBN)
          Examination, 2024
        </h5>
        <p className="">
          Multi-Tasking (Non-Technical) Staff and Havaldar (CBIC & CBN)
          Examination, 2024
        </p>
      </div>
      <div className="py-3 bg-danger bg-opacity-25 d-flex justify-content-around">
        <div className="container">
          <div className="py-2">
            <p>Application Start Date</p>
            <h6>12/212/12</h6>
          </div>
          <div className="py-2">
            <p>Last Date for Online Fee Payment</p>
          </div>
        </div>
        <div className="container ">
          <div className="py-2">
            <p>Application End Date</p>
          </div>
          <div className="py-2">
            <p>
              Window for Correction Application Form and Online Payment of
              Correction Changes
            </p>
          </div>
      </div>
    </div>
      <div className="px-4 pb-2 text-end bg-danger bg-opacity-25">
        <button className="btn btn-danger bg-opacity-50 rounded-pill">Apply</button>
      </div>
        </div>
  );
}

export default Exambox;
