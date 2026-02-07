import QuestionTimer from './QuizTimer.jsx';
import Answers from './Answers.jsx';
import { useState } from 'react';
import QUESTION from '../questions.js';
export default function Question({ questionIndex, onSelect, onSkipAnswer }) {
  const [answer, setAnswer] = useState({
    selectedAnswer: '',
    isCorrect: null,
  });

  let timer = 10000;

  if (answer.selectedAnswer) {
    timer = 1000;
  }

  if (answer.isCorrect !== null) {
    timer = 2000;
  }
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

  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answeState = answer.isCorrect ? 'correct' : 'wrong';
  } else if (answer.selectedAnswer) {
    answeState = 'answered';
  }

  return (
    <div id="question">
      <QuestionTimer
        key={timer}
        timeout={timer}
        onTimeout={answer.selectedAnswer === '' ? onSkipAnswer : null}
        mode={answeState}
      />
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
