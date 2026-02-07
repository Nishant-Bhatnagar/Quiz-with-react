import QuestionTimer from './QuizTimer.jsx';
import Answers from './Answers.jsx';
import { useState } from 'react';
import QUESTION from '../questions.js';
export default function Question({ questionIndex, onSelect, onSkipAnswer }) {
  const [answer, setAnswer] = useState({
    selectedAnswer: '',
    isCorrect: null,
  });

  function handleSelectAnswer(answer) {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });
    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTION[questionIndex].answers[0] === answer,
      });
      setTimeout(() => {
        onSelect(answer);
      }, 2000);
    }, 1000);
  }
  let answeState = '';

  if (answer.selectedAnswer) {
    answeState = answer.isCorrect ? 'correct' : 'wrong';
  }

  return (
    <div id="question">
      <QuestionTimer timeout={10000} onTimeout={onSkipAnswer} />
      <h2>{QUESTION[questionIndex].text}</h2>
      <Answers
        answerState={answeState}
        selectedAnswer={answer.selectedAnswer}
        answers={QUESTION[questionIndex].answers}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
}
