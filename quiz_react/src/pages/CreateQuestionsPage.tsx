import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface Question {
  text: string;
  correctAnswer: string;
  incorrectAnswers: string[];
}

const CreateQuestionsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { quizName, numQuestions, user } = location.state as { quizName,numQuestions,user};

  const [questions, setQuestions] = useState<Question[]>(
    Array(numQuestions).fill({ text: "", correctAnswer: "", incorrectAnswers: ["", "", ""] })
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleQuestionChange = (field: string, value: string) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      const question = { ...updatedQuestions[currentQuestionIndex] };

      if (field === "text") {
        question.text = value;
      } else if (field === "correctAnswer") {
        question.correctAnswer = value;
      } else if (field.startsWith("incorrectAnswer")) {
        const answerIndex = parseInt(field.split("_")[1], 10);
        const updatedIncorrectAnswers = [...question.incorrectAnswers];
        updatedIncorrectAnswers[answerIndex] = value;
        question.incorrectAnswers = updatedIncorrectAnswers;
      }

      updatedQuestions[currentQuestionIndex] = question;
      return updatedQuestions;
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < numQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      console.log(token);
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const quizResponse = await axios.post("http://localhost:8000/api/create-quiz", {
        title: quizName,
        description: "...",
      },{ headers });
      console.log("Quiz Response:", quizResponse.data);

      const quizId = quizResponse.data.quiz_id; 
      console.log(quizId);
      for (const question of questions) {
        const questionResponse = await axios.post(`http://localhost:8000/api/store-question`, {
          question_text: question.text,
          right: question.correctAnswer,
          wrong1: question.incorrectAnswers[0],
          wrong2: question.incorrectAnswers[1],
          wrong3: question.incorrectAnswers[2],
          quiz_id: quizId,
        },{ headers });
        console.log("Question Response:", questionResponse.data);
      }

      alert("Kviz i pitanja su uspešno kreirani!");
      navigate("/", { state: {user}}); 
    } catch (error) {
      console.error("Greška prilikom kreiranja kviza i pitanja:", error);
      alert("Došlo je do greške prilikom kreiranja kviza. Pokušajte ponovo.");
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Pitanje {currentQuestionIndex + 1} od {numQuestions}</h2>

              <div className="mb-3">
                <label className="form-label">Tekst pitanja</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tekst pitanja"
                  value={currentQuestion.text}
                  onChange={(e) => handleQuestionChange("text", e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Tačan odgovor</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tačan odgovor"
                  value={currentQuestion.correctAnswer}
                  onChange={(e) => handleQuestionChange("correctAnswer", e.target.value)}
                />
              </div>
              {currentQuestion.incorrectAnswers.map((answer, i) => (
                <div key={i} className="mb-3">
                  <label className="form-label">Netačan odgovor {i + 1}</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={`Netačan odgovor ${i + 1}`}
                    value={answer}
                    onChange={(e) => handleQuestionChange(`incorrectAnswer_${i}`, e.target.value)}
                  />
                </div>
              ))}

              <div className="d-flex justify-content-between mt-4">
                <button
                  className="btn btn-secondary"
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                >
                  Nazad
                </button>
                {currentQuestionIndex === numQuestions - 1 ? (
                  <button className="btn btn-success" onClick={handleSubmit}>Završi Kviz</button>
                ) : (
                  <button className="btn btn-primary" onClick={handleNext}>Dalje</button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateQuestionsPage;
