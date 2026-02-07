import quizCompleteImg from '../assets/quiz-complete.png';
import QUESTIONS from '../questions.js';
export default function Summary({ userAnswers }) {
  const questionLength = QUESTIONS.length;
  let skippedCount = 0;
  let correctCount = 0;

  userAnswers.forEach((answer, index) => {
    if (answer === null) {
      skippedCount += 1;
    } else if (answer === QUESTIONS[index].answers[0]) {
      correctCount += 1;
    }
  });
  const incorrectCount = questionLength - skippedCount - correctCount;
  return (
    <div id="summary">
      <img src={quizCompleteImg} alt="Trophy icon" />
      <h2>Quiz Completed!</h2>
      <div id="summary-stats">
        <p>
          <span className="number">
            {Math.round((skippedCount / questionLength) * 100)}%
          </span>
          <span className="text">skipped</span>
        </p>
        <p>
          <span className="number">
            {Math.round((correctCount / questionLength) * 100)}%
          </span>
          <span className="text">answered correctly</span>
        </p>
        <p>
          <span className="number">
            {Math.round((incorrectCount / questionLength) * 100)}%
          </span>
          <span className="text">answered incorrectly</span>
        </p>
      </div>
      <ol>
        {userAnswers.map((answer, index) => {
          let cssClass = 'user-answer';
          if (answer === null) {
            cssClass += ' skipped';
          } else if (answer === QUESTIONS[index].answers[0]) {
            cssClass += ' correct';
          } else {
            cssClass += ' wrong';
          }
          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className="question"> {QUESTIONS[index].text}</p>
              <p className={cssClass}> {answer ?? 'Skipped'}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
