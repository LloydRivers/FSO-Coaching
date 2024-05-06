import React from "react";

const Button = ({ handleClick, text, testId }) => {
  return (
    <button onClick={handleClick} data-testid={testId}>
      {text}
    </button>
  );
};

export default Button;
