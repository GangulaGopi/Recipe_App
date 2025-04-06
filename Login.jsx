import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Get registered users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Find user with matching credentials
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      // Set the logged-in user to localStorage
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      alert("Login successful!");

      // Navigate to Home page ("/") which is protected in App.js
      navigate("/");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p>
          New User? <Link to="/register">Create an Account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
