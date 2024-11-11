import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../components/Button.tsx";

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, points, maxPoints, user, selectedQuiz } = location.state || {
    score: 0,
  };

  const calculateResults = (points: number, maxPoints: number) => {
    let normalizedScore = (points * 100) / maxPoints;
    normalizedScore = parseFloat(normalizedScore.toFixed(2));
    return normalizedScore;
  };

  const saveQuizAttempt = async () => {
    const normalizedScore = calculateResults(points, maxPoints);
    try {
      await axios.post("http://localhost:8000/api/create-quiz-attempt", {
        user_id: user.id,
        quiz_id: selectedQuiz.id,
        score: normalizedScore,
      });
      console.log("Quiz attempt saved successfully!");
      navigate("/", { state: { selectedQuiz, user } });
    } catch (error) {
      console.error("Error saving quiz attempt:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <div className="card">
            <div className="card-body">
              <h1 className="display-4">Korisnik: {user.name}</h1>
              <h1 className="display-4">Broj tačnih odgovora: {score}</h1>
              <h1 className="display-4">
                Tvoj rezultat: {calculateResults(points, maxPoints)}%
              </h1>
              <Button onClick={saveQuizAttempt}>Igraj ponovo!</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
