import React, { useState } from "react";
import "/src/styles/task2.css";
import img1 from "/src/assets/image2.png";
import { useNavigate } from "react-router-dom";

function SignupForm({ setIsAuthenticated }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showconditions, setShowconditions] = useState(false);
  const navigate = useNavigate();
const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function tosignIn(e) {
    e.preventDefault();

    if (!username) { alert("Username is required"); return; }
    if (username.length < 3) { alert("Username must be at least 3 characters"); return; }
    if (username.length > 15) { alert("Username must be less than 15 characters"); return; }
    if (!/^[A-Za-z0-9]{3,15}$/.test(username)) { alert("Username format is invalid"); return; }

    if (!email) { alert("Email is required"); return; }
    if (email.length > 50) { alert("Email must be less than 50 characters"); return; }
    if (regex.test(email)) { alert("Email format is invalid"); return; }

    if (!password) { alert("Password is required"); return; }
    if (password.length < 4) { alert("Password must be at least 4 characters"); return; }
    if (password.length > 20) { alert("Password must be less than 20 characters"); return; }
    if (!/[A-Z]/.test(password)) { alert("Password must contain at least one capital letter"); return; }
    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(password)) { alert("Password must contain at least one special character"); return; }
    if (!/[0-9]/.test(password)) { alert("Password must contain at least one number"); return; }

    if (!confirmPassword) { alert("Confirm Password is required"); return; }
    if (password !== confirmPassword) { alert("Passwords do not match"); return; }

    alert("Sign Up Successful!");
    setIsAuthenticated(true);
    navigate("/home");
  }

  function displayconditions() {
    return (
      <div className="passwordConditions">
        <p>Password must contain:</p>
        <ul>
          <li>At least 4 characters</li>
          <li>At least 1 uppercase letter</li>
          <li>At least 1 number</li>
          <li>At least 1 special character</li>
          <li>Maximum 15 characters</li>
        </ul>
      </div>
    );
  }

  return (
    <div className="signup-container">
      <div className="image-section">
        <img src={img1} alt="signinImg" className="sign-image" />
      </div>
      <form className="signup-form" onSubmit={tosignIn}>
        <div className="form-struct">
          <input
            type="text"
            placeholder="Username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setShowconditions(true)}
            onBlur={() => setShowconditions(false)}
          />
          {showconditions && displayconditions()}
          <input
            type="password"
            placeholder="Confirm Password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit" id="signInbtn">
            Sign Up
          </button>
        </div>
        <div className="login-section">
          <p>
            Already have an account?{" "}
            <a href="/login" className="login-link">
              Log in
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
