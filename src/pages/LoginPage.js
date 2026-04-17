import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    // For now, just store user in localStorage (simple authentication)
    // In production, you'd call your backend API here
    if (isSignup) {
      localStorage.setItem("grindmapUser", JSON.stringify({ email }));
      navigate("/dashboard");
    } else {
      // Check if user exists
      const user = localStorage.getItem("grindmapUser");
      if (user) {
        navigate("/dashboard");
      } else {
        setError("User not found. Please sign up first.");
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1 className="login-logo">GrindMap</h1>
          <p className="login-tagline">Track Your Coding Journey</p>
        </div>

        <div className="login-box">
          <h2>{isSignup ? "Create Account" : "Welcome Back"}</h2>
          
          {error && <div className="login-error">{error}</div>}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
              />
            </div>

            <button type="submit" className="login-button">
              {isSignup ? "Sign Up" : "Login"}
            </button>
          </form>

          <div className="login-toggle">
            {isSignup ? (
              <p>
                Already have an account?{" "}
                <span onClick={() => setIsSignup(false)}>Login</span>
              </p>
            ) : (
              <p>
                Don't have an account?{" "}
                <span onClick={() => setIsSignup(true)}>Sign Up</span>
              </p>
            )}
          </div>
        </div>

        <div className="login-features">
          <div className="feature">
            <span className="feature-icon">📊</span>
            <p>Track Multiple Platforms</p>
          </div>
          <div className="feature">
            <span className="feature-icon">🔥</span>
            <p>Maintain Your Streak</p>
          </div>
          <div className="feature">
            <span className="feature-icon">📈</span>
            <p>Visualize Progress</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

