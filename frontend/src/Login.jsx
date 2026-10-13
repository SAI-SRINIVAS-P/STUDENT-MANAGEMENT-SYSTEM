import React, { useState } from "react";
import "./Login.css";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    // Demo credentials for the login page
    if (
      email.trim().toLowerCase() === "admin@students.com" &&
      password === "Admin@123"
    ) {
      setError("");
      onLogin();
    } else {
      setError("Invalid email or password.");
    }
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-logo">SM</div>

        <h1>Welcome Back</h1>
        <p className="login-subtitle">
          Sign in to your Student Management System
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="login-email">Email Address</label>
          <input
            id="login-email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="username"
            required
          />

          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
          />

          {error && <p className="login-error">{error}</p>}

          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <p className="login-footer">
          Student Management System
        </p>
      </section>
    </main>
  );
}