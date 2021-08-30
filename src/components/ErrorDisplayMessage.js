import React from "react";

const ErrorDisplayMessage = ({ error }) => {
  return (
    <div class="alert alert-danger" role="alert">
      {error?.serverErr} {error?.appErr}
    </div>
  );
};

export default ErrorDisplayMessage;
