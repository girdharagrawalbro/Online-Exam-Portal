// components/AlertMessage.js
import React from "react";

const AlertMessage = ({ type, message }) => {
  return (
    <div className={`alert alert-${type} p-2`} role="alert">
      {message}
    </div>
  );
};

export default AlertMessage;
