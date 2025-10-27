import React, { useState } from "react";
import "/src/styles/task.css";
import img from "/src/assets/image.png";

function LogInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function changeEmail(e) {
    setEmail(e.target.value);
  }

  function changePassword(e) {
    setPassword(e.target.value);
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

  function sbtbtn(e) {
    e.preventDefault();

    const emailError = verifyEmail(email);
    const passwordError = verifyPassword(password);

    if (!emailError || !passwordError) return;

    alert("Form submitted successfully!");
  }

  return (
    <div className="login-container">
      <div className="image-section">
        <img src={img} alt="loginImg" className="login-image" />
      </div>
      <form className="login-form" onSubmit={sbtbtn}>
        <div className="form-struct">
          <input
            type="email"
            placeholder="Phone number, username, or email"
            value={email}
            onChange={changeEmail}
            id="inEmail"
          ></input>
          {email.length > 50 && <p>Email should be less than 50 characters</p>}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={changePassword}
            id="inPassword"
          ></input>
          <button type="submit" id="logInbtn">
            Log In
          </button>
          <div className="divider">
            <span>OR</span>
          </div>
          <a href="https://www.google.com/?zx=1758723440207&no_sw_cr=1" id="extra">
            Log in with Google
          </a>
          <a href="#" id="forgotpass">
            Forgot password?
          </a>
        </div>
        <div className="signup-section">
          <p>Don't have an account? <a href="#" className="signup-link">Sign up</a></p>
        </div>
      </form>
    </div>
  );
}

export default LogInForm;