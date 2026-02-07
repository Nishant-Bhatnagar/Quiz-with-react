import { useState, useCallback, useRef } from 'react';
import QUESTIONS from '../questions.js';
import quizCompleteImg from '../assets/quiz-complete.png';
import Question from './Question.jsx';
export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = userAnswers.length;

  const quizIsCompleted = activeQuestionIndex === QUESTIONS.length;
  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer,
  ) {
    setUserAnswers((prevAnswer) => {
      return [...prevAnswer, selectedAnswer];
    });
  }, []);
  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer],
  );
  if (quizIsCompleted) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Trophy icon" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        questionIndex={activeQuestionIndex}
        onSelect={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
