import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const CreateQuizPage = () => {
  const [quizName, setQuizName] = useState("");
  const [numQuestions, setNumQuestions] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user;

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/create-questions", { state: { quizName, numQuestions, user } });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Kreiraj novi kviz</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Ime kviza</label>
                  <input
                    type="text"
                    className="form-control"
                    value={quizName}
                    onChange={(e) => setQuizName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Broj pitanja</label>
                  <input
                    type="number"
                    className="form-control"
                    min="1"
                    value={numQuestions}
                    onChange={(e) => setNumQuestions(parseInt(e.target.value))}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Kreiraj
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateQuizPage;
