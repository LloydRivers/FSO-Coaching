import React from "react";

const StatisticLine = ({ text, value }) => {
  return (
    <p data-testid={text}>
      {text} {value}
    </p>
  );
};

export default StatisticLine;
