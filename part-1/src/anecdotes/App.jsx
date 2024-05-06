import { useState } from "react";
import Statistics from "./Statistics";
import Button from "./Button";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [totalFeedback, setTotalFeedback] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
    setTotalFeedback(totalFeedback + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
    setTotalFeedback(totalFeedback + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
    setTotalFeedback(totalFeedback + 1);
  };

  return (
    <>
      {totalFeedback > 0 ? (
        <>
          <h1>give feedback</h1>
          <Button handleClick={handleGoodClick} text="good" testId="good" />
          <Button
            handleClick={handleNeutralClick}
            text="neutral"
            testId="neutral"
          />
          <Button handleClick={handleBadClick} text="bad" testId="bad" />

          <br />

          <h1>statistics</h1>
          <Statistics
            testId="statistics"
            good={good}
            bad={bad}
            neural={neutral}
            totalFeedback={totalFeedback}
          />
        </>
      ) : (
        <>
          <h1 data-testid="heading">give feedback</h1>
          <Button
            handleClick={handleGoodClick}
            text="good"
            testId="no-feedback-good"
          />
          <Button
            handleClick={handleNeutralClick}
            text="neutral"
            testId="neutral"
          />
          <Button
            handleClick={handleBadClick}
            text="bad"
            testId="no-feedback-bad"
          />

          <br />

          <h2 data-testid="statistics-heading">statistics</h2>
          <p>no feedback given</p>
        </>
      )}
    </>
  );
};

export default App;
