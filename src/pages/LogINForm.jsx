import React, { useState } from "react";
import "/src/styles/task.css";
import img from "/src/assets/image.png";
import { useNavigate } from "react-router-dom";

function LogInForm({ setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  function changeEmail(e) {
    setEmail(e.target.value);
    setApiError("");
  }

  function changePassword(e) {
    setPassword(e.target.value);
    setApiError("");
  }

  function verifyEmail(value) {
    if (!value) {
      alert("Email is required");
      return false;
    }
    if (value.length > 50) {
      alert("Email must be less than 50 characters");
      return false;
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(value)) {
      alert("Email format is invalid");
      return false;
    }
    return true;
  }

  function verifyPassword(value) {
    if (!value) {
      alert("Password is required");
      return false;
    }
    if (value.length < 4) {
      alert("Password must be at least 4 characters");
      return false;
    }
    if (value.length > 20) {
      alert("Password must be less than 20 characters");
      return false;
    }
    if (!/[A-Z]/.test(value)) {
      alert("Password must contain at least one capital letter");
      return false;
    }
    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(value)) {
      alert("Password must contain at least one special character");
      return false;
    }
    if (!/[0-9]/.test(value)) {
      alert("Password must contain at least one number");
      return false;
    }
    return true;
  }

  async function sbtbtn(e) {
    e.preventDefault();
    setApiError("");

    const emailError = verifyEmail(email);
    const passwordError = verifyPassword(password);

    if (!emailError || !passwordError) return;

    setLoading(true);

    try {
      const response = await fetch('https://task4-authdb.onrender.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      const data = await response.json();

      if (response.ok) {
        document.cookie = `token=${data.token}; path=/; max-age=86400`;

        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
        }

        alert("Login Successful!");
        setIsAuthenticated(true);
        navigate("/home");
      } else {
        setApiError(data.message || "Login failed. Check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setApiError("Server is waking up. Please wait 30 seconds and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <div className="image-section">
        <img src={img} alt="loginImg" className="login-image" />
      </div>
      <form className="login-form" onSubmit={sbtbtn}>
        <div className="form-struct">
          {apiError && (
            <div style={{
              background: '#ffebee',
              color: '#c62828',
              padding: '10px',
              borderRadius: '5px',
              marginBottom: '15px',
              fontSize: '14px'
            }}>
              ⚠️ {apiError}
            </div>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={changeEmail}
            id="inEmail"
            disabled={loading}
          />
          {email.length > 50 && <p>Email should be less than 50 characters</p>}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={changePassword}
            id="inPassword"
            disabled={loading}
          />
          <button type="submit" id="logInbtn" disabled={loading}>
            {loading ? "Logging In..." : "Log In"}
          </button>
          <div className="divider">
            <span>OR</span>
          </div>
          <a href="https://www.google.com" id="extra">
            Log in with Google
          </a>
          <a href="#" id="forgotpass">
            Forgot password?
          </a>
          <div style={{
            fontSize: '12px',
            color: '#666',
            textAlign: 'center',
            marginTop: '15px',
            padding: '10px',
            background: '#fff8e1',
            borderRadius: '5px'
          }}>
            ⏰ First login may take 30+ seconds as server wakes up.
          </div>
        </div>
        <div className="signup-section">
          <p>
            Don't have an account?{" "}
            <a href="/signup" className="signup-link">
              Sign up
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LogInForm;