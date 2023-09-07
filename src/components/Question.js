import React, { useEffect, useState } from "react";

function Question({ question, onAnswered }) {

  //using the useState hook to initialize the timeRemaining and giving it an initial value of 10
  
  const [timeRemaining, setTimeRemaining] = useState(10);

  //starting our useEffect hook so that we can run side effects as we go.

  useEffect(() => {
    if (timeRemaining === 0) {
      setTimeRemaining(10);
      onAnswered(false);
      return;
    }

    //setting setTimeout that will essentially run a callback function after 1000 milliseconds.
    //also the timeRemaining shall decrease by 1 (from the deliverables given)
    const timerId = setTimeout(() => {
      
      setTimeRemaining((timeRemaining) => timeRemaining - 1);
    }, 1000);

    

    //setting up the cleanUp now. So when we're done with the component it's unmounted. 
    //so this is where we clear out any timeouts or intervals that were created in the past.
    
    return function () {
      clearTimeout(timerId);
    };
  }, [timeRemaining, onAnswered]);

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
