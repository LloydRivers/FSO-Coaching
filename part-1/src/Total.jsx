import React from "react";

const Total = ({ total }) => {
  return <p>Number of exercises {total.reduce((acc, cur) => acc + cur, 0)}</p>;
};

export default Total;
