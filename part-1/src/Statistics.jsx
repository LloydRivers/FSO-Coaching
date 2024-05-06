import React from "react";

const Statistics = ({ text, value }) => {
  return (
    <>
      <h2>statistics</h2>
      <p data-testid={text}>
        {text} {value}
      </p>
    </>
  );
};

export default Statistics;
