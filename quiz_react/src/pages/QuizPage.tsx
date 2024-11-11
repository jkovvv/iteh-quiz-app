import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import QuestionCard from "../components/QuestionCard.tsx";
import Timer, { TimerHandle } from "../components/Timer.tsx";

interface Question {
  id: number;
  quiz_id: number;
  question_text: string;
  right: string;
  wrong1: string;
  wrong2: string;
  wrong3: string;
  created_at: string;
  updated_at: string;
}

const QuizPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [points, setPoints] = useState(0);
  const [maxPoints, setMaxPoints] = useState(0);
  const timerRef = useRef<TimerHandle | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const { selectedQuiz, user } = location.state || {};

  useEffect(() => {
    if (selectedQuiz && selectedQuiz.all_questions) {
      setQuestions(selectedQuiz.all_questions);
    } else {
      navigate("/");
    }
  }, [selectedQuiz, navigate]);

  const checkAnswer = (option: string) => {
    setMaxPoints(maxPoints + 5000);
    const currentQuestion = questions[currentQuestionIndex];

    if (option === currentQuestion.right) {
      setScore(score + 1);
      if (timerRef.current) {
        setPoints(points + timerRef.current.getTimeLeft());
      }
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigate("/results", {
        state: {
          score: score + (option === currentQuestion.right ? 1 : 0),
          points:
            points +
            (option === currentQuestion.right && timerRef.current
              ? timerRef.current.getTimeLeft()
              : 0),
          maxPoints: maxPoints + 5000,
          user,
          selectedQuiz,
        },
      });
    }
  };

  const handleAnswer = (option: string) => {
    console.log(timerRef.current?.getTimeLeft());
    setRefreshKey((prev) => prev + 1);
    checkAnswer(option);
  };

  if (questions.length === 0 || currentQuestionIndex >= questions.length) {
    return <div>Loading questions...</div>;
  }

  const { question_text, right, wrong1, wrong2, wrong3 } =
    questions[currentQuestionIndex];

  const options = [right, wrong1, wrong2, wrong3].sort(
    () => Math.random() - 0.5
  );

  return (
    <div key={refreshKey} className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body text-center">
              <h3 className="card-title">Pitanje {currentQuestionIndex + 1}</h3>
              <QuestionCard
                question={question_text}
                options={options}
                onAnswerSelect={handleAnswer}
              />
              <Timer
                ref={timerRef}
                duration={5000} // 5 sekundi
                onTimeUp={() => console.log("Vreme je isteklo!")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
