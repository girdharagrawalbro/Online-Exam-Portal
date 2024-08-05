import React from "react";

const ApplicationBox = ({ application, onAccept, onReject }) => {
  if (!application) {
    return <div>Loading...</div>;
  }

  return (
    <div className="d-flex p-1 gap-3 bg-light text-dark rounded-pill align-items-center justify-content-between">
      <div className="d-flex gap-2 align-items-center">
        <img
          className="profile-img"
          alt=""
          src="https://www.pixelstalk.net/wp-content/uploads/2016/09/Best-Beautiful-Images-For-Desktop-Nature.png"
        />
        <h6 className="">{application.user.name}</h6>
      </div>
      <h6 className="">{application.user.email}</h6>
      {/* <h6 className="">{application.user.mobileNumber}</h6> */}
      <h6 className="">{application.exam.title}</h6>
      <h6 className="">{application.status}</h6>

      <div className="gap-2 d-flex px-3 align-items-center">
        <button className="btn btn-success btn-sm" onClick={() => onAccept(application._id)}>Accept</button>
        <button className="btn btn-danger btn-sm" onClick={() => onReject(application._id)}>Reject</button>
      </div>
    </div>
  );
};

export default ApplicationBox;
