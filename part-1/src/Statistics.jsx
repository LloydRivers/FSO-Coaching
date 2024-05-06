import React from "react";

const Statistics = ({ text, value }) => {
  return (
    <>
      <p data-testid={text}>
        {text} {value}
      </p>
    </>
  );
};

export default Statistics;
