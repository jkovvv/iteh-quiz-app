import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.tsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [role, setRole] = useState("user");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (username && password) {
      try {
        const response = await axios.post("http://localhost:8000/login", {
          email: username,
          password: password,
        });

        const token = response.data.token;
        console.log(token);
        localStorage.setItem("accessToken", token);
        const userResponse = await axios.get("http://localhost:8000/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = userResponse.data;
        console.log("User data:", userData);

        login(token);
        navigate("/", { state: { user: userData } });
      } catch (error) {
        console.error(
          "Greška prilikom prijave:",
          error.response || error.message
        );
        alert("Došlo je do greške prilikom prijave.");
      }
    }
  };

  const handleRegister = async () => {
    if (name && email && registerPassword && role) {
      try {
        const response = await axios.post("http://localhost:8000/register", {
          name: name,
          email: email,
          password: registerPassword,
          role: role,
        });
        alert("Uspešno ste se registrovali!");

        const token = response.data.token;
        localStorage.setItem("accessToken", token);

        const userResponse = await axios.get("http://localhost:8000/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = userResponse.data;
        console.log("User data:", userData);

        console.log("Token:", token);
        login(token);
        navigate("/", { state: { user: userData } });
      } catch (error) {
        console.error(
          "Greška prilikom registracije:",
          error.response || error.message
        );
        alert("Došlo je do greške prilikom registracije.");
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <div className="card">
            <div className="card-body">
              <h2 className="display-4 text-center">Login</h2>
              <input
                type="text"
                className="form-control mt-3"
                placeholder="Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                className="form-control mt-3"
                placeholder="Lozinka"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="btn btn-primary mt-3 w-100"
                onClick={handleLogin}
              >
                Prijavite se
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6 text-center">
          <div className="card">
            <div className="card-body">
              <h2 className="display-4 text-center">Register</h2>
              <input
                type="text"
                className="form-control mt-3"
                placeholder="Ime"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                className="form-control mt-3"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="form-control mt-3"
                placeholder="Lozinka"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
              />
              <select
                className="form-control mt-3"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="user">User</option>
                <option value="creator">Creator</option>
              </select>
              <button
                className="btn btn-primary mt-3 w-100"
                onClick={handleRegister}
              >
                Registrujte se
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
