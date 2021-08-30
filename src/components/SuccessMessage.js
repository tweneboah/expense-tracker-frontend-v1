import React from "react";

const SuccessMessage = ({ msg }) => {
  return (
    <div class="alert alert-success" role="alert">
      {msg}
    </div>
  );
};

export default SuccessMessage;
