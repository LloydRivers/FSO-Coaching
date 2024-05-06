import { useState } from "react";

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
      <h1>give feedback</h1>
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>

      <br />

      <h2>statistics</h2>
      <p data-testid="good">good {good}</p>
      <p data-testid="neutral">neutral {neutral}</p>
      <p data-testid="bad">bad {bad}</p>
      <p data-testid="all">all {good + neutral + bad}</p>
      <p data-testid="average">average {(good - bad) / totalFeedback || 0}</p>
      <p data-testid="positive">
        positive {((good / totalFeedback) * 100 || 0) + " %"}
      </p>
    </>
  );
};

export default App;
