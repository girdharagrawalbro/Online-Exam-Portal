import React from "react";

const UserBox = ({user}) => {
  if (!user) {
    return <div>Loading...</div>; // or handle this case gracefully
  }

  return (
    <div className="d-flex p-1 gap-3 bg-light text-dark rounded-pill align-items-center justify-content-between">
      <div className="d-flex gap-2 align-items-center">
        <img
          className="profile-img"
          alt=""
          src="https://www.pixelstalk.net/wp-content/uploads/2016/09/Best-Beautiful-Images-For-Desktop-Nature.png"
        />
        <h6 className="">{user.name}</h6>
      </div>
      <h6 className="">{user.email}</h6>
      <h6 className="">{user.mobileNumber}</h6>
      <div className="gap-2 d-flex px-3 align-items-center">
      <h6 className="">{user.date}</h6>
      </div>
    </div>
  );
};

export default UserBox;
