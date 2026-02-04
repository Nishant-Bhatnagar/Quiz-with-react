import { useState } from 'react';
import QUESTIONS from '../questions.js';
import quizCompleteImg from '../assets/quiz-complete.png';
export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = userAnswers.length;

  const quizIsCompleted = activeQuestionIndex === QUESTIONS.length;
  function handleSelectAnswer(selectedAnswer) {
    console.log(userAnswers);
    setUserAnswers((prevAnswer) => {
      return [...prevAnswer, selectedAnswer];
    });
  }
  if (quizIsCompleted) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Trophy icon" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }
  const shufffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shufffledAnswers.sort(() => {
    Math.random() - 0.5;
  });
  return (
    <div id="quiz">
      <div id="question">
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shufffledAnswers.map((answer) => (
            <li key={answer} className="answer">
              <button onClick={() => handleSelectAnswer(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
