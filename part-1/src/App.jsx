import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  /*
  If you are here reading this from my Reddit training group, please see: 
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
  */
  const [points, setPoints] = useState(
    Array.from({ length: anecdotes.length }, () => 0)
  );

  const handlePoints = () => {
    const copy = [...points];
    copy[selected] += 1;
    setPoints(copy);
  };

  const handleNextAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  return (
    <>
      <button onClick={handlePoints} data-testid="vote">
        vote
      </button>
      <button onClick={handleNextAnecdote}>next anecdote</button>
      <h1> Anecdote of the day</h1>
      <div data-testid="anecdote">{anecdotes[selected]}</div>

      <h2>Anecdote with most votes</h2>
      <div data-testid="most-voted">
        {anecdotes[points.indexOf(Math.max(...points))]}
      </div>
    </>
  );
};

export default App;
