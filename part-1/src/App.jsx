import { useState } from "react";
import Statistics from "./Statistics";

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
          <button onClick={handleGoodClick}>good</button>
          <button onClick={handleNeutralClick}>neutral</button>
          <button onClick={handleBadClick}>bad</button>

          <br />

          <h1>statistics</h1>
          <Statistics text="good" value={good} />
          <Statistics text="neutral" value={neutral} />
          <Statistics text="bad" value={bad} />
          <Statistics text="all" value={totalFeedback} />
          <Statistics text="average" value={(good - bad) / totalFeedback} />
          <Statistics
            text="positive"
            value={`${(good / totalFeedback) * 100 || 0} %`}
          />
        </>
      ) : (
        <>
          <h1>give feedback</h1>
          <button onClick={handleGoodClick}>good</button>
          <button onClick={handleNeutralClick}>neutral</button>
          <button onClick={handleBadClick}>bad</button>

          <br />

          <h1>statistics</h1>
          <p>no feedback given</p>
        </>
      )}
    </>
  );
};

export default App;
