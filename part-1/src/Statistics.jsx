import React from "react";
import StatisticLine from "./StatisticLine";

const StatisticLine = ({ good, bad, neutral }) => {
  return (
    <>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={totalFeedback} />
      <StatisticLine text="average" value={(good - bad) / totalFeedback} />
      <StatisticLine
        text="positive"
        value={`${(good / totalFeedback) * 100 || 0} %`}
      />
    </>
  );
};

export default StatisticLine;
