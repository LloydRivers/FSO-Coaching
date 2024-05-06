import React from "react";

const StatisticLine = ({ text, value }) => {
  return (
    <tr data-testid={text}>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

export default StatisticLine;
