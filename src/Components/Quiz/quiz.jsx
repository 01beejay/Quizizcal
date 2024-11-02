import React, { useState } from "react";
import "./quiz.css";
import { data } from "../Quiz/data";
import { useRef } from "react";
const Quiz = () => {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);

  let option1 = useRef(null);
  let option2 = useRef(null);
  let option3 = useRef(null);
  let option4 = useRef(null);

  let option_arr = [option1, option2, option3, option4];

  const chkAns = (e, ans) => {
    if (lock === false) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setLock(true);
        setScore((prev) => ++prev);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        option_arr[question.ans - 1].current.classList.add("correct");
      }
    }
  };

  const next = () => {
    if (lock === true) {
      if (index === data.length - 1) {
        setResult(true);
        return 0;
      }

      setIndex(++index);
      setQuestion(data[index]);
      setLock(false);
      option_arr.map((option) => {
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
        return null;
      });
    }
  };

  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setResult(false);
    setScore(0);
    setLock(false);
  };
  return (
    <div className="container">
      <h1>Quizzical</h1>
      <hr />
      {result ? (
        <></>
      ) : (
        <>
          <h2>
            {index + 1}. {question.question}
          </h2>
          <ul>
            <li>
              <button
                ref={option1}
                onClick={(e) => {
                  chkAns(e, 1);
                }}
                className="option"
              >
                {question.optiion1}
              </button>
            </li>
            <li>
              <button
                ref={option2}
                onClick={(e) => {
                  chkAns(e, 2);
                }}
                className="option"
              >
                {question.optiion2}
              </button>
            </li>
            <li>
              <button
                ref={option3}
                onClick={(e) => {
                  chkAns(e, 3);
                }}
                className="option"
              >
                {question.optiion3}
              </button>
            </li>
            <li>
              <button
                ref={option4}
                onClick={(e) => {
                  chkAns(e, 4);
                }}
                className="option"
              >
                {question.optiion4}
              </button>
            </li>
          </ul>
          <div className="btns">
            <button className="button_next" onClick={next}>
              Next
            </button>
          </div>

          <div className="index">
            {index + 1} of {data.length} questions
          </div>
        </>
      )}
      {result ? (
        <>
          {score <= 3 ? (
            <h2 className="bad_grade">Opppps😓....Keep Grinding🤦‍♀️</h2>
          ) : (
            <h2 className="good_grade">Wow😲😲....Awesome👍</h2>
          )}
          <h2>
            You scored <span className="score">{score}</span> out of {""}
            <span className="score">{data.length}</span>
          </h2>
          <button onClick={reset} className="button_next">
            reset
          </button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Quiz;
