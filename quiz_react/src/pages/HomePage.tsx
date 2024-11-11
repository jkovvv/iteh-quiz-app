import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../components/Button.tsx";
import QuizList from "../components/QuizList.tsx";
import saveAs from "file-saver";
import Papa from "papaparse";
import axios from "axios";

interface Quiz {
  id: number;
  title: string;
  description: string;
}

interface QuizAttempt {
  id: number;
  quiz_id: number;
  user_id: number;
  score: number;
  created_at: string;
  quiz: Quiz;
}

const HomePage = () => {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [funFact, setFunFact] = useState<string>("");
  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user;

  const onQuizSelect = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/show-all-quizzes"
        );
        const quizzes = Array.isArray(response.data)
          ? response.data
          : [response.data];
        setQuizzes(quizzes);
        localStorage.setItem("quizzes", JSON.stringify(quizzes));
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    const fetchFunFact = async () => {
      const cachedFunFact = localStorage.getItem("funFact");
      if (cachedFunFact) {
        setFunFact(cachedFunFact);
      } else {
        try {
          const response = await fetch(
            "https://uselessfacts.jsph.pl/random.json?language=en"
          );
          const data = await response.json();
          setFunFact(data.text);
          localStorage.setItem("funFact", data.text);
        } catch (error) {
          console.error("Error fetching fun fact:", error);
        }
      }
    };

    const fetchQuizAttempts = async (page = 1) => {
      if (user) {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/show-all-quiz-attempts-from-user/${user.id}?page=${page}`
          );
          setQuizAttempts(response.data.data);
          setTotalPages(response.data.last_page);
        } catch (error) {
          console.error("Nema quiz attempts.");
        }
      }
    };

    fetchData();
    fetchFunFact();
    fetchQuizAttempts(currentPage);
  }, [user, currentPage]);

  const handleButtonClick = () => {
    if (selectedQuiz) {
      localStorage.removeItem("funFact");
      navigate("/quiz", { state: { selectedQuiz, user } });
    } else {
      console.log("Please select a quiz first.");
    }
  };

  const handlePageChange = (direction: "previous" | "next") => {
    if (direction === "previous" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleExport = () => {
    const csvData = quizAttempts.map((attempt) => ({
      Quiz: attempt.quiz.title,
      Score: attempt.score,
      Date: new Date(attempt.created_at).toLocaleDateString(),
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "quiz_attempts.csv");
  };

  const handleCreateQuizClick = () => {
    if (user?.role === "creator") {
      navigate("/create-quiz", { state: { user: user } });
    } else {
      console.log("Only creators can create quizzes.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <ul className="list-group">
                <QuizList items={quizzes} onSelectItem={onQuizSelect} />
              </ul>
              {user?.role === "creator" && (
                <div className="d-flex justify-content-center pt-3">
                  <Button onClick={handleCreateQuizClick}>Napravi kviz</Button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-6 text-center">
          <div className="card">
            <div className="card-body">
              <h1 className="display-4">Dobrodošli u kviz!</h1>
              <p className="lead">Testirajte svoje znanje!</p>
              <Button onClick={handleButtonClick}>Započni kviz!</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body text-center">
              <h5 className="card-title">Zanimljiva Činjenica</h5>
              <p className="card-text">{funFact}</p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-body text-center">
              <h5 className="card-title">Moji Pokušaji Kvizova</h5>
              <table className="table">
                <thead>
                  <tr>
                    <th>Kviz</th>
                    <th>Rezultat</th>
                    <th>Datum</th>
                  </tr>
                </thead>
                <tbody>
                  {quizAttempts.map((attempt) => (
                    <tr key={attempt.id}>
                      <td>{attempt.quiz.title}</td>
                      <td>{attempt.score}%</td>
                      <td>
                        {new Date(attempt.created_at).toLocaleDateString(
                          "sr-RS",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          }
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="d-flex justify-content-between mt-3">
                <button
                  className="btn btn-primary"
                  onClick={() => handlePageChange("previous")}
                  disabled={currentPage === 1}
                >
                  Prethodna
                </button>
                <span>
                  Stranica {currentPage} od {totalPages}
                </span>
                <button
                  className="btn btn-primary"
                  onClick={() => handlePageChange("next")}
                  disabled={currentPage === totalPages}
                >
                  Sledeća
                </button>
              </div>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleExport();
                }}
              >
                Export to .csv format
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
